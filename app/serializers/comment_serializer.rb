class CommentSerializer
  include JSONAPI::Serializer
  attributes :body, :created_at
end
