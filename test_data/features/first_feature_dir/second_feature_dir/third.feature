@journal
Feature: Journal Search
  As a user,
  I want a Journal
  So that I can record my thoughts and annotate things

  Background:
    Given Seeq is running as an admin user named "adminJournalSearchUser"
    And the help is closed
    And Seeq data has been reset
    And a workbook with a multi-line journal entry and an annotation

  Scenario: Searching for Name should not match journal entry/annotations
    When I click on the Data tab
    And I search for "journal" in the "Name" field
    Then no search results are shown

  Scenario: Searching for Description should not match journal entry/annotation
    When I click on the Data tab
    And I click "More filters" in the search filter panel
    And I search for "journal" in the "Description" field
    Then no search results are shown
