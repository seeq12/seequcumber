@manual
Feature: Second Feature
  As a Formula user,
  I want to be able manage and display formula variables,
  So that I can be efficient when using the tool.

  Background:
    Given that Seeq is running in the browser
    And I add to the display pane three items relative to an asset
    And the Formula tool is displayed
      """
      Test
      """
    And the three details pane items appear as formula variables

  Scenario: Function documentation formatting
    When the Formula pane is expanded
      | PASS | 0.38.00-v201804061000 | Tester One |  |
    And I type "overlap" into the function search input
      | PASS | 0.38.00-v201804061000 | Tester One |  |
      | PASS | 0.36.01-v201801170334 | Tester One |  |
      | PASS | 0.36.00-v201711181534 | Tester One |  |
    And I click on the "overlappedBy" function variation
      | PASS | 0.38.00-v201804061000 | Tester One |  |
      | PASS | 0.36.01-v201801170334 | Tester One |  |
      | PASS | 0.36.00-v201711181534 | Tester One |  |
    Then I see the description, and below it is a text diagram of input and output capsules, in monospaced font.
      | PASS | 0.38.00-v201804061001 | Tester One |  |
      | PASS | 0.36.01-v201801170334 | Tester One |  |
      | PASS | 0.36.00-v201711181534 | Tester One |  |