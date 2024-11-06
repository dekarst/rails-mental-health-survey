require 'rails_helper'

RSpec.describe SurveyResponse, type: :model do
  it 'is valid with valid attributes' do
    response = SurveyResponse.new(question1: 'I feel good', question2: 3, question3: 'All is well')
    expect(response).to be_valid
  end

  it 'is invalid without question1' do
    response = SurveyResponse.new(question2: 3, question3: 'All is well')
    expect(response).to_not be_valid
  end

  it 'is invalid without question2' do
    response = SurveyResponse.new(question1: 'I feel good', question3: 'All is well')
    expect(response).to_not be_valid
  end

  it 'is invalid without question3' do
    response = SurveyResponse.new(question1: 'I feel good', question2: 3)
    expect(response).to_not be_valid
  end

  it 'encrypts question1' do
    response = SurveyResponse.create(question1: 'Sensitive info', question2: 3, question3: 'All is well')
    encrypted_text = response.encrypted_question1 # Assuming attr_encrypted creates this attribute
    expect(encrypted_text).to_not eq('Sensitive info')
  end
end
