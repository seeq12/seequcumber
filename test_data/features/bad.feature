@manual
Feature: Formula Tool Variables
  As a Formula user,
  I want to be able manage and display formula variables,
  So that I can be efficient when using the tool.

  Background:
    Given that Seeq is running in the browser
    ####
    '''
    And I add to the display pane three items relative to an asset
    And the Formula tool is displayed
      """
      Test
      """
    And the three details pane items appear as formula variables

  Scenario: Function documentation formatting
    When the Formula pane is expanded
      | PASS | 0.38.00-v201804061001 | Tester One    |  |
     