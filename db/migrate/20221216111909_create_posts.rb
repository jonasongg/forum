class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    enable_extension("citext")

    create_table :posts do |t|
      t.citext :title
      t.citext :body
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
