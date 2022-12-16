class Post < ApplicationRecord
  validates :head, presence: true
  validates :body, presence: true

  belongs_to :user
end
