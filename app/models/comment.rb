class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :user
  belongs_to :post

  #If there is no parent comment, then it is a top level comment
  belongs_to :parent, class_name: 'Comment', optional: true

  #Enable replies, explicitly state foreign_key so that the replies are keeping track of their parent,
  #not the other way around
  has_many :replies, class_name: 'Comment', foreign_key: :parent_id, dependent: :destroy
end
