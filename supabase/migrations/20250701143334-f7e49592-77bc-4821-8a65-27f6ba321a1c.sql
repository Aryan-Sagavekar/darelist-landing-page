
-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS trigger_update_waitlist_positions ON public.waitlist;
DROP FUNCTION IF EXISTS update_waitlist_positions();

-- Create improved function to calculate and update positions for ALL users
CREATE OR REPLACE FUNCTION update_waitlist_positions()
RETURNS TRIGGER AS $$
BEGIN
  -- Update referral count for the referrer if someone was referred
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE public.waitlist 
    SET referral_count = referral_count + 1,
        updated_at = now()
    WHERE id = NEW.referred_by;
  END IF;
  
  -- Calculate and update positions for ALL users in the waitlist
  UPDATE public.waitlist 
  SET position = rank_calc.new_position,
      updated_at = now()
  FROM (
    SELECT 
      id,
      ROW_NUMBER() OVER (
        ORDER BY 
          (COALESCE(referral_count, 0) * 5) DESC,  -- Referral bonus: 5 positions per referral
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

-- Fix existing null positions by running the position calculation once
UPDATE public.waitlist 
SET position = rank_calc.new_position,
    updated_at = now()
FROM (
  SELECT 
    id,
    ROW_NUMBER() OVER (
      ORDER BY 
        (COALESCE(referral_count, 0) * 5) DESC,
        created_at ASC
    ) as new_position
  FROM public.waitlist
) rank_calc
WHERE waitlist.id = rank_calc.id AND waitlist.position IS NULL;
