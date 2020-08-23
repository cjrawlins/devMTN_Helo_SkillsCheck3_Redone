UPDATE posts
SET
title = $2,
img = $3,
content = $4
WHERE id = $1;
