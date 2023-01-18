class CommentSerializer
  include JSONAPI::Serializer
  attributes :body

  attribute :user_username do |object|
    object.user.username
  end

  #If the year of the date the post is created is this year, then omit the year
  attribute :created_at do |object|
    object.created_at.strftime(object.created_at.year == Time.now.year ? "%d %b" : "%d %b %Y")
   end

  # Serialise each reply also
  attribute :replies do |object|
    object.replies.map do |reply|
      CommentSerializer.new(reply)
    end
  end
end
