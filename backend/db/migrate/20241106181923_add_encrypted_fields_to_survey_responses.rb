class AddEncryptedFieldsToSurveyResponses < ActiveRecord::Migration[6.1]
  def change
    add_column :survey_responses, :encrypted_question1, :string
    add_column :survey_responses, :encrypted_question1_iv, :string
  end
end
