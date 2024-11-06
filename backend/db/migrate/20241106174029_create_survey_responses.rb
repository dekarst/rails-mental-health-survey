class CreateSurveyResponses < ActiveRecord::Migration[7.2]
  def change
    create_table :survey_responses do |t|
      t.string :question1
      t.integer :question2
      t.text :question3

      t.timestamps
    end
  end
end
