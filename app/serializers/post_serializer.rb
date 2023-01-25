class PostSerializer
  include JSONAPI::Serializer
  attributes :title, :body

  attribute :user_username do |object|
    object.user.username
  end

  # Serialise each tag
  attribute :tags do |object|
    object.tags.map do |tag|
      TagSerializer.new(tag)
    end
  end

  #If the year of the date the post is created is this year, then omit the year
  attribute :created_at do |object|
   object.created_at.strftime(object.created_at.year == Time.now.year ? "%d %b" : "%d %b %Y")
  end
end
