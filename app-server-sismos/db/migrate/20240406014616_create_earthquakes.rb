class CreateEarthquakes < ActiveRecord::Migration[7.1]
  def change
    create_table :earthquakes do |t|
      t.string :title
      t.string :url
      t.string :code
      t.string :place
      t.float :mag
      t.string :magType
      t.float :longitude
      t.float :latitude
      t.timestamps
    end
  end
end
