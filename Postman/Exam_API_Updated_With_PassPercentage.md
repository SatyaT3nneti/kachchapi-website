# Exam API Postman Collection - Updated with Pass Percentage

## Overview
The Exam API Postman collection has been updated to include the new `passPercentage` field in the exam preferences. This field determines the minimum percentage required for a student to pass the exam.

## Updated Endpoints

### 1. Generate Questions
**Endpoint**: `POST /api/exam/generate-questions`

**Updated Request Body**:
```json
{
  "syllabusContent": "This chapter covers the fundamentals of business statistics...",
  "preferences": {
    "difficultyLevel": "Medium",
    "validUntil": "2024-12-31T23:59:59Z",
    "totalQuestions": 15,
    "examDuration": 90,
    "passPercentage": 60.0,
    "questionTypes": [
      {
        "type": "Objective",
        "count": 10
      },
      {
        "type": "Descriptive",
        "count": 3
      },
      {
        "type": "YesNo",
        "count": 2
      }
    ]
  },
  "attachments": null,
  "files": [...]
}
```

### 2. Create Exam
**Endpoint**: `POST /api/exam/create`

**Updated Request Body**:
```json
{
  "title": "Business Statistics Mid-Term Exam",
  "description": "Comprehensive exam covering descriptive statistics, probability, and hypothesis testing",
  "syllabusContent": "This chapter covers the fundamentals of business statistics...",
  "preferences": {
    "difficultyLevel": "Medium",
    "validUntil": "2024-12-31T23:59:59Z",
    "totalQuestions": 15,
    "examDuration": 90,
    "passPercentage": 60.0,
    "questionTypes": [
      {
        "type": "Objective",
        "count": 10
      },
      {
        "type": "Descriptive",
        "count": 3
      },
      {
        "type": "YesNo",
        "count": 2
      }
    ]
  },
  "questions": [...]
}
```

### 3. Update Exam
**Endpoint**: `PUT /api/exam/{examId}`

**Updated Request Body**:
```json
{
  "title": "Updated Business Statistics Mid-Term Exam",
  "description": "Updated comprehensive exam covering descriptive statistics, probability, and hypothesis testing",
  "syllabusContent": "This chapter covers the fundamentals of business statistics...",
  "preferences": {
    "difficultyLevel": "Hard",
    "validUntil": "2024-12-31T23:59:59Z",
    "totalQuestions": 20,
    "examDuration": 120,
    "passPercentage": 75.0,
    "questionTypes": [
      {
        "type": "Objective",
        "count": 15
      },
      {
        "type": "Descriptive",
        "count": 3
      },
      {
        "type": "YesNo",
        "count": 2
      }
    ]
  },
  "questions": [...]
}
```

## Pass Percentage Examples

### Standard Exam (60% Pass)
```json
{
  "preferences": {
    "passPercentage": 60.0
  }
}
```

### Challenging Exam (75% Pass)
```json
{
  "preferences": {
    "passPercentage": 75.0
  }
}
```

### Easy Exam (50% Pass)
```json
{
  "preferences": {
    "passPercentage": 50.0
  }
}
```

### Advanced Exam (80% Pass)
```json
{
  "preferences": {
    "passPercentage": 80.0
  }
}
```

## How Pass Percentage Works

1. **Default Value**: If not specified, the system uses 60% as the default pass percentage
2. **Submission Status**: When a student submits an exam:
   - If score >= passPercentage → Status: "Pass"
   - If score < passPercentage → Status: "Fail"
3. **Statistics**: Pass/fail statistics are calculated based on the exam's specific pass percentage
4. **Flexibility**: Each exam can have its own pass threshold

## Testing Examples

### Example 1: Create Easy Exam
```json
{
  "title": "Introduction to Statistics",
  "preferences": {
    "difficultyLevel": "Easy",
    "passPercentage": 50.0,
    "examDuration": 60
  }
}
```

### Example 2: Create Advanced Exam
```json
{
  "title": "Advanced Statistical Analysis",
  "preferences": {
    "difficultyLevel": "Hard",
    "passPercentage": 80.0,
    "examDuration": 120
  }
}
```

### Example 3: Update Exam Pass Percentage
```json
{
  "title": "Updated Exam",
  "preferences": {
    "passPercentage": 70.0
  }
}
```

## Notes

- The `passPercentage` field is a decimal value (e.g., 60.0 for 60%)
- Valid range: 0.0 to 100.0
- Default value: 60.0 (if not specified)
- This field affects both exam creation and updates
- The pass percentage is used to determine submission status (Pass/Fail)
- Statistics calculations use the exam-specific pass percentage 