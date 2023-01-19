class User < ApplicationRecord
  validates :username, presence: true
  
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
end
