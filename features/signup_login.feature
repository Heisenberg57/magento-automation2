Feature: Magento Sign Up and Login

  Scenario: Successful account creation and login
    Given I am on the Magento home page
    When I navigate to the Sign Up page
    And I register with valid details
    Then I should land on my account dashboard
    When I log out
    And I log in with the same credentials
    Then I should see my account dashboard again

Scenario: Sign up with already existing email address
  Given I am on the Magento home page
  When I navigate to the Sign Up page
  And I register with an already existing email address
  Then I should see an error message about the email already being used

