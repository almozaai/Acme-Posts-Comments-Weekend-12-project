const pg = require('pg');
const uuid = require('uuid');
const { Client } = pg;
const client = new Client('postgress://localhost/acme_posts_comments');
client.connect();

const node_uuid = uuid.v4();
const express_uuid = uuid.v4();
const react_uuid = uuid.v4();

const challenging_uuid = uuid.v4();
const loveIt_uuid = uuid.v4();
const what_uuid = uuid.v4();


const SQL = `
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS posts;
CREATE TABLE posts(
    id UUID PRIMARY KEY,
    topic VARCHAR(255) UNIQUE NOT NULL
  );
  CREATE TABLE tags(
    id UUID PRIMARY KEY,
    text VARCHAR(255) UNIQUE NOT NULL,
    post_id UUID REFERENCES posts(id)
  );
  INSERT INTO posts(id, topic) VALUES('${node_uuid}','Node');
  INSERT INTO posts(id, topic) VALUES('${express_uuid}','Express');
  INSERT INTO posts(id, topic) VALUES('${react_uuid}','React');
  INSERT INTO tags(id, text, post_id) VALUES('${challenging_uuid}','Challenging' ,'${express_uuid}');
  INSERT INTO tags(id, text, post_id) VALUES('${loveIt_uuid}','Love It','${react_uuid}');
  INSERT INTO tags(id, text, post_id) VALUES('${what_uuid}','What??','${react_uuid}');
`;

const syncAndSeed =  async () => {
  await client.query(SQL);
  console.log('sucess');
};

const findAllPosts = async ()=>{
  const response = await client.query('SELECT * FROM posts');
  return response.rows
};

const findAllTags = async ()=>{
    const response = await client.query('SELECT * FROM tags');
    return response.rows
  };

module.exports = {
  syncAndSeed,
  findAllPosts,
  findAllTags
}

