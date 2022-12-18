class PostSerializer
  include JSONAPI::Serializer
  attributes :title, :body, :created_at
  belongs_to :user
end
