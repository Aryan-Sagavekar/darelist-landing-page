
-- Create waitlist table to store email signups
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  referral_code TEXT UNIQUE DEFAULT SUBSTRING(MD5(RANDOM()::TEXT), 1, 8),
  referred_by UUID REFERENCES public.waitlist(id),
  position INTEGER,
  referral_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_waitlist_email ON public.waitlist(email);
CREATE INDEX idx_waitlist_referral_code ON public.waitlist(referral_code);
CREATE INDEX idx_waitlist_position ON public.waitlist(position);

-- Function to calculate and update positions
CREATE OR REPLACE FUNCTION update_waitlist_positions()
RETURNS TRIGGER AS $$
BEGIN
  -- Update referral count for the referrer
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE public.waitlist 
    SET referral_count = referral_count + 1,
        updated_at = now()
    WHERE id = NEW.referred_by;
  END IF;
  
  -- Calculate position (earlier signups + referral bonus get better positions)
  UPDATE public.waitlist 
  SET position = rank_calc.new_position,
      updated_at = now()
  FROM (
    SELECT 
      id,
      ROW_NUMBER() OVER (
        ORDER BY 
          (referral_count * 5) DESC,  -- Referral bonus: 5 positions per referral
          created_at ASC
      ) as new_position
    FROM public.waitlist
  ) rank_calc
  WHERE waitlist.id = rank_calc.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update positions when new users join
CREATE TRIGGER trigger_update_waitlist_positions
  AFTER INSERT ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_waitlist_positions();

-- Enable Row Level Security (optional - for future auth features)
ALTER TABLE public.waitlist ENABLE ROW LEVEL Security;

-- Allow public read access to waitlist count
CREATE POLICY "Allow public read access for count" ON public.waitlist
  FOR SELECT USING (true);

-- Allow public insert for new signups
CREATE POLICY "Allow public insert" ON public.waitlist
  FOR INSERT WITH CHECK (true);
