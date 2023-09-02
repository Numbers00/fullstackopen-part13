CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO blogs (author, url, title) VALUES ('Logcast', 'https://medium.com/@logcast/how-ai-is-shifting-the-creator-industry-f10b98be9bb0', 'How AI is shifting the creator industry');
INSERT INTO blogs (author, url, title) VALUES ('Neil Patel', 'https://neilpatel.com/blog/vtubers/', 'Are VTubers the Future of Video Content Creation?');
