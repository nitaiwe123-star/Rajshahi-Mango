# Security Specification - Mango App

## Data Invariants
1. A user cannot grant themselves admin privileges.
2. An order cannot be modified once cancelled or delivered (enforced via admin panel logic, though rules allow admin edits for correction).
3. Reviews are 'pending' by default and only visible when 'approved'.
4. Guests can only read public data (products, approved reviews, settings).
5. Orders created by guests must not have a `userId` field.

## The Dirty Dozen Payloads (Rejection Tests)

1. **Self-Admin Escalation**: User `user123` attempts to update `/users/user123` with `role: 'admin'`.
2. **Order Hijack**: User `userA` attempts to read `/orders/orderB` (not theirs).
3. **Price Poisoning**: User attempts to create a product (not an admin).
4. **Draft Review Leak**: Guest attempts to read a 'pending' review.
5. **Ghost Review**: User attempts to create an 'approved' review.
6. **Coupon Theft**: User attempts to create a 100% discount coupon.
7. **Order Spoofing**: User `userA` attempts to create an order for `userB`.
8. **Settings Vandalism**: Guest attempts to update site logo.
9. **Role Injection**: Guest attempts to write to `/admins/targetUser`.
10. **ID Overload**: User attempts to use a 1MB string as a document ID.
11. **Shadow Fields**: User attempts to add `isVerified: true` to their profile.
12. **Timestamp Fraud**: User attempts to set `createdAt` to a date in the past.

## Test Runner Status
- All 12 payloads are expected to return `PERMISSION_DENIED` based on current `firestore.rules`.
