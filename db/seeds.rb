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
      title: "Title of post 1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at pharetra magna. Proin mi mauris, porta at mollis vitae, maximus vitae est. Mauris lorem dolor, vulputate volutpat dictum id, volutpat at sapien. Nunc finibus vestibulum dolor ac facilisis. Sed vel metus vitae ipsum auctor rutrum. In id mollis lacus. Etiam leo velit, tincidunt in leo dictum, elementum malesuada eros. Vestibulum vulputate enim vitae lacus consequat ultricies. Etiam vestibulum blandit lorem, nec pellentesque felis pharetra et. Fusce urna sapien, porta ac ullamcorper eget, hendrerit eu erat. Vivamus sed placerat dui, nec hendrerit nunc. Fusce a neque orci. Nunc varius leo vel velit pretium maximus ac vitae neque.",
      user: users.first
  },
  {
      title: "Title of post 2",
      body: "Pellentesque vel pulvinar ligula. Nulla facilisi. Praesent condimentum consequat malesuada. Aliquam ipsum dolor, bibendum sit amet euismod sed, vulputate vel tortor. Vivamus arcu purus, elementum id dui eu, congue vulputate turpis. Nunc bibendum, nulla non tempor lacinia, nunc magna semper justo, vel molestie ante diam vel risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce pharetra varius nibh, id rutrum leo ultricies a. Cras accumsan est eget nulla varius suscipit. Maecenas dapibus erat vitae magna varius, id mattis nibh placerat. Nunc aliquet sodales erat non sollicitudin. Nunc nec pulvinar elit.",
      user: users.first
  }
])

comments = Comment.create([
  {
    body: "Integer aliquam, elit in mollis malesuada, neque mauris iaculis turpis, sit amet accumsan ipsum tellus a risus.",
    user: users.first,
    post: posts.first,
    parent: nil
  },
  {
    body: "Nulla porttitor pellentesque magna a imperdiet. Donec ac scelerisque nulla, vitae ultrices nulla. Maecenas tempor velit et lacinia semper.",
    user: users.first,
    post: posts.first,
    parent: nil
  }
])

replies = Comment.create([
  {
    body: "Maecenas tempor velit et lacinia semper.",
    user: users.first,
    post: posts.first,
    parent: comments.first
  },
  {
    body: "Aenean sed dignissim erat.",
    user: users.first,
    post: posts.first,
    parent: comments.first
  }
])

Comment.create([
  {
    body: "Donec ac scelerisque nulla.",
    user: users.last,
    post: posts.first,
    parent: replies.first
  }
])