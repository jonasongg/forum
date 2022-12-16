class PostSerializer
  include JSONAPI::Serializer
  attributes :title, :body, :created_at
end
