-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can view photos" ON photos;

-- Create a permissive policy that allows anyone to view photos
CREATE POLICY "Anyone can view photos"
ON photos
FOR SELECT
TO public
USING (true);