require 'rails_helper'

RSpec.describe SurveyResponsesController, type: :controller do
  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new survey response and returns success' do
        post :create, params: { survey: { question1: 'Good', question2: 3, question3: 'All is well' } }
        expect(response).to have_http_status(:success)
      end
    end

    context 'with invalid parameters' do
      it 'returns error messages' do
        post :create, params: { survey: { question1: '', question2: nil, question3: '' } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
