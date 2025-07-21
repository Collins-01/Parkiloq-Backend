# Parkiloq Backend MVP Review

_Last reviewed: 2025-07-20_

## 1. Implemented Features, Files, and Endpoints

### Booking
- **Endpoints:**
  - `POST /bookings` — Create booking
  - `GET /bookings` — Get bookings for user
  - `DELETE /bookings/:id` — Cancel booking
- **Architecture:**
  - Controllers use Use Cases (`CreateBooking`, `CancelBooking`)
  - Use Cases use Repository (`SupabaseBookingRepository`)
  - Repository in infra layer uses Supabase (correct separation)

### Parking Spots
- **Files:**
  - `ParkingSpotController.ts`
  - `ParkingSpot` entity
- **Endpoints:**
  - (Assumed) Create/Get spots (verify actual methods)

### User
- **Files:**
  - `User` entity
- **Endpoints:**
  - No evidence of User Controller, Profile, or Auth endpoints

### Supabase Integration
- **Infra layer only:** Confirmed for Bookings (correct)

### API Routes
- **Not shown:** Route wiring needs explicit verification

---

## 2. What’s Still Left to Build for MVP

### Auth
- [ ] Register (Supabase Auth)
- [ ] Login
- [ ] Logout
- [ ] Get current user

### User Profile
- [ ] Update profile
- [ ] Get profile

### Parking Spots
- [ ] Create spot
- [ ] Get spots
- [ ] (Optional) Update/Delete spot

### Bookings
- [x] Create booking
- [x] Get my bookings
- [x] Cancel booking

### Architecture & Cleanliness
- [x] Use cases/entities/controllers/repositories for Bookings
- [ ] User/Auth use cases, controllers, repositories
- [ ] API route wiring for all features

### Supabase Integration
- [x] Infra layer only for Bookings
- [ ] Confirm for Users, Spots, Auth

---

## 3. Suggestions for Improvements

- Use authentication middleware (get userId from token/session, not body/query)
- Standardize error handling
- Add DTOs/validation for request bodies
- Add OpenAPI/Swagger API docs
- Add unit and integration tests
- Organize routes modularly
- Store Supabase keys/config in env variables

---

## 4. MVP Completion Checklist

### Auth
- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Get current user

### User Profile
- [ ] Update profile
- [ ] Get profile

### Parking Spots
- [ ] Create spot
- [ ] Get spots

### Bookings
- [x] Create booking
- [x] Get my bookings
- [x] Cancel booking

### Architecture
- [ ] User/Auth use cases, controllers, repositories
- [ ] Route wiring for all features

---

## 5. Next Steps

1. Implement Auth and User Profile endpoints (controllers, use cases, repos)
2. Verify and finish ParkingSpot endpoints (create/get)
3. Add route files and connect all controllers
4. Add authentication middleware
5. Add API docs and tests

---

_This review is intended to be directly copy-pasteable for AI or human review. For detailed file-by-file or endpoint mapping, further exploration is required._
