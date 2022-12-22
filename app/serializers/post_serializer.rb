class PostSerializer
  include JSONAPI::Serializer
  attributes :title, :body, :created_at

  #If the year of the date the post is created is this year, then omit the year
  #attribute :created_at do |object|
  #  object.created_at.strftime(object.created_at.year == Time.now.year ? "%d %b" : "%d %b %Y")
  #end

  has_one :user
end
