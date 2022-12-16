# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).


users = User.create([
  {
      username: "user1"
  },
  {
      username: "user2"
  }
])

posts = Post.create([
  {
      title: "Post 1 title",
      body: "blablabla",
      user: users.first
  },
  {
      title: "Post 2 title",
      body: "blablablablablabla",
      user: users.first
  }
])