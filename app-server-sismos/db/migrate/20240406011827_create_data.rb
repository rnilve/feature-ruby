class CreateData < ActiveRecord::Migration[7.1]
  def change
    create_table :data do |t|
      t.string :dataGeo

      t.timestamps
    end
  end
end
