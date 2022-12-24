class CommentSerializer
  include JSONAPI::Serializer
  attributes :body, :created_at, :parent_id

  attribute :user_username do |object|
    object.user.username
  end
end
