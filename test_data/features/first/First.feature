@manual
Feature: First Feature
  As a user,
  I want to test SeeQucumber
  So that I cab be sure it is parsing feature files as expected.

  Background:
    Given that Seequcumber is running
    And I have started a test

  Scenario: Scenario 1 passed
    When step completed with version 00
      | PASS | 0.40.00-v201811141001 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then step completed with version 01
      | PASS | 0.40.00-v201811141001 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And step completed with version 02
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And step ompleteld with single data row
      | PASS | 0.40.00-v201811141000 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

  Scenario: Scenario 2
    Given skipped step
      | SKIPPED | 0.40.00-v201811141002 | Tester One |  |
      | PASS    | 0.38.02-v201806292342 | Tester One |  |
      | PASS    | 0.38.01-v201806130941 | Tester One |  |
    When step completed with version 02
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then step completed with version 02
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |


  Scenario: Scenario 3 failed with defect
    Given completed step failed with defect
      | FAIL | 0.40.00-v201811141002 | Tester One | defect-1 |
      | PASS | 0.38.02-v201806292342 | Tester One |          |
      | PASS | 0.38.01-v201806130941 | Tester One |          |
    And step completed no defect
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When step completed no defect
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

  Scenario: Scenario 3 failed with another defect
    Given completed step failed with defect
      | FAIL | 0.40.00-v201811141002 | Tester One | defect-2 |
      | PASS | 0.38.02-v201806292342 | Tester One |          |
      | PASS | 0.38.01-v201806130941 | Tester One |          |
    And step completed no defect
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When step completed no defect
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

  Scenario: Scenario 4 using "quotes"
    Given I have a step with "quotes" multiple "times"
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

    When step "completed"
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |


  Scenario: Scenario 7 out of sorting order
    Given step completed
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When step completed
      | PASS | 0.40.00-v201811141002 | Tester One |  |

  Scenario: Scenario 5 with previous failures
    When step completed
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then step with previous failure should PASS
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | FAIL | 0.40.00-v201811141001 | Test One   |  |


  Scenario: Another Scenario 6 sorting - should be first
    When step completed
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then step completed
      | PASS | 0.40.00-v201811141002 | Tester One |  |

  Scenario: Scenario 8 all steps incomplete
    When step incomplete
      | PASS | 0.39.00-v201811141002 | Tester One |  |
    Then step incomplete
      | PASS | 0.39.00-v201811141002 | Tester One |  |
    Then step incomplete
      | PASS | 0.39.00-v201811141002 | Tester One |  |

  Scenario: Scenario 9 some steps incompleted - status should be incomplete
    When step incomplete
      | PASS | 0.39.00-v201811141002 | Tester One |  |
    Then step completed
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then step completed
      | PASS | 0.40.00-v201811141002 | Tester One |  |

  Scenario: Scenario 10 Empty row
    When I have an step with no results
    Then I should still be able to process the file

  Scenario: Scenario 11 Empty version
    When I have an step with results but not version match
      | PASS |  | Tester One |  |
    Then I should still be able to process the file
      | PASS | 0.39.00-v201811141002 | Tester One |  |
