# Notes

## API
- Delete a single contact (DELETE)
  - success: 204 No Content
  - failure: 400 Bad Request (ContactNotFound - Cannot find contact.)
- Get all contacts (GET)
  - success: 200 OK (JSON array of contact objects)
  - Contact object:
    - id: numeric
    - full_name: string
    - email: string
    - phone_number: string
    - tags: string, comma separated OR null
- Get a single contact (GET)
  - success: 200 OK (JSON single contact object)
  - failure: 400 Bad Request (ContactNotFound - Cannot find contact.)
- Save a contact (POST)
  - accepts: JSON or query string
    - full_name required
    - email, phone_number, tags not required
  - success: 201 OK (JSON single contact object);
  - failure: 400 Bad Request (ContactNotFound - Cannot find contact.)
- Update a contact (PUT)
  - accepts: JSON or query string
    - edits/rewrites any value you include, preserves values not present
  - success: 201 OK (JSON single contact object)
  - failure: 400 Bad Request (ContactNotFound - Cannot find contact.)

## UI
- Centered H1 "Contact Manager"
- "Add Contact" button + search input field
  - "Add Contact" button clicked:
    - "Create Contact" form slides up to hide button + search
  - Search field
- Contacts display box
  - if no contacts:
    - There are no contacts.
    - Add Contact button
  - If 1+ contacts:
    - display in each contact in a box
      - {{Name}}
      - Phone Number:
      - Email:
      - edit button + pencil icon
        - slides up Edit Contact form to cover
      - delete button + garbage icon
        - prompts alert - "Do you want to delete the contact? cancel or OK buttons
- Create Contact form
  - full name input
    - required (red if no input or whitespace only)
  - email address input
    - email validation
    - required (red if no input or if not following email pattern)
  - telephone number input
    - required (red if no input or whitespace only)
  - Submit button
    - create contact
  - Cancel button
    - slide up original screen
- Edit Contact Form
  - same as create Contact form except:
    - "Edit Contact" header
    - Must be storing the contact ID in the background
    - Different method + url
    - data autofilled
- Search Bar
  - Narrows the visible contacts based on matching the search ty
  - case insensitive

## Handlebars templates
- Add contact + search bar box
- display contacts
  - if none, "There are no contacts" message + add contact button
  - if 1+ each contact
    - each needs to wrap
- Individual contact card
  - partial
- Add Contact form
  - h1, 3 labels + fields, submit & cancel buttons
- Edit contact form
- No contacts starting with X??


## extras
- animations
- enter to submit forms once inside form