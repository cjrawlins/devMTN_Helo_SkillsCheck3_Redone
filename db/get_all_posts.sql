SELECT p.id, p.title, p.img, p.content, p.author_id, u.username, u.profile_pic
FROM posts P
JOIN users u on p.author_id = u.id;