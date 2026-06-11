-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id integer PRIMARY KEY,
  local_image_url text NOT NULL
);

-- Enable RLS
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Public read access for cards table
CREATE POLICY "Public read cards" ON cards FOR SELECT USING (true);

-- Storage bucket setup (Note: Bucket creation usually via API or Console, but policies here)
-- Policy for public read access to ygo-images
-- (Assuming bucket 'ygo-images' is created)
CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'ygo-images');
