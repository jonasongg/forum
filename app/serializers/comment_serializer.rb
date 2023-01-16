class CommentSerializer
  include JSONAPI::Serializer
  attributes :body, :created_at

  attribute :user_username do |object|
    object.user.username
  end

  attribute :replies do |object|
    object.replies.map do |reply|
      CommentSerializer.new(reply)
    end
  end
end
