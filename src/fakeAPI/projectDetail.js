const projectDetail = {
    "title": "Monks Test Project",
    "slug": "monks-test-project",
    "description": "This is a project description! FAKE",
    "team": "monks-test-team",
    "is_archived": false,
    "manager": "monks",
    "memberships": [
      {
        "user": "monks",
        "role": 2,
        "role_name": "Manager"
      },
      {
        "user": "Dev1",
        "role": 1,
        "role_name": "Developer"
      },
      {
        "user": "Dev2",
        "role": 1,
        "role_name": "Developer"
      }
    ],
    "created": "2020-11-18T12:35:25.159558-05:00",
    "modified": "2020-11-18T12:35:25.159585-05:00",
    "url": "http://localhost:8000/api/teams/monks-test-team/projects/monks-test-project/",
    "tickets_list": "http://localhost:8000/api/teams/monks-test-team/projects/monks-test-project/tickets/",
    "open_tickets": 1,
    "user_permissions": {
      "view": true,
      "edit": true,
      "update_manager": true,
      "create_tickets": true
    }
  }

  export default projectDetail