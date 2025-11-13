# Google Maps Migration Complete ✅

## What Was Changed

All map components have been migrated from **Leaflet** to **Google Maps API**:

### 1. **Job Posting Form** (`JobFormDialog.tsx`)
- ✅ Replaced Leaflet map picker with `GoogleMapsLocationPicker`
- ✅ Features: Autocomplete search, click-to-place, drag-and-drop marker
- ✅ Saves: `locationLat`, `locationLng`, `locationAddress`

### 2. **Homepage Map** (`GoogleJobMap.tsx` - NEW)
- ✅ Shows all approved jobs with coordinates
- ✅ Marker clustering for better performance
- ✅ Color-coded markers by employer type:
  - 🔵 Blue = COMPANY
  - 🟢 Green = AGENCY  
  - 🟡 Yellow = CLIENT
- ✅ InfoWindow popups with job details
- ✅ "View Details" button to navigate to job page
- ✅ "My Location" button for geolocation
- ✅ Numbered markers for easy identification

### 3. **Job Details Map** (`GoogleJobLocationMap.tsx` - NEW)
- ✅ Shows single job location
- ✅ Auto-geocodes if no coordinates saved
- ✅ InfoWindow with job title, company, address
- ✅ Fallback to text display if geocoding fails

---

## 🔧 Setup Instructions

### Step 1: Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Places API** (for autocomplete)
   - **Geocoding API** (for address conversion)
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

### Step 2: Add API Key to Environment

Create or update `.env.local` file in your project root:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Important:** The `NEXT_PUBLIC_` prefix is required for client-side access.

### Step 3: Restrict API Key (Security)

In Google Cloud Console:
1. Click your API key
2. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add: `localhost:3000/*` (for development)
   - Add: `yourdomain.com/*` (for production)
3. Under "API restrictions":
   - Select "Restrict key"
   - Choose: Maps JavaScript API, Places API, Geocoding API

### Step 4: Restart Development Server

```bash
npm run dev
```

---

## 🧪 Testing Guide

### Test 1: Post a New Job with Location

1. Sign in as employer
2. Click "Post a Job"
3. Fill job details
4. In location section:
   - Type an address in the search box (autocomplete should work)
   - OR click directly on the map
   - OR drag the marker to adjust position
5. Verify the address updates automatically
6. Submit the job

**Expected:** Job saves with `locationLat`, `locationLng`, `locationAddress`

### Test 2: Homepage Map Display

1. Go to homepage
2. Scroll to "Explore Jobs on Map"
3. Click "Map View" button

**Expected:**
- ✅ Map loads with all jobs that have coordinates
- ✅ Markers are color-coded by employer type
- ✅ Counter shows: "Showing X jobs on map"
- ✅ Click marker → InfoWindow popup appears
- ✅ Popup shows: title, company, location, salary, type
- ✅ "View Details" button works

### Test 3: Job Details Page Map

1. Click any job from homepage
2. Scroll to right sidebar → "Job Location" section

**Expected:**
- ✅ Map displays with single marker at job location
- ✅ Marker has InfoWindow with job details
- ✅ Map is interactive (zoom, pan)

### Test 4: Geolocation

1. On homepage map, click "My Location" button
2. Allow browser location access

**Expected:**
- ✅ Red marker appears at your location
- ✅ Map centers on your position
- ✅ Zoom level adjusts to 12

### Test 5: Old Jobs (No Coordinates)

Jobs posted before this update won't have coordinates.

**Behavior:**
- Homepage map: Skips jobs without coordinates, shows count
- Job details: Attempts to geocode address using Google API
- If geocoding fails: Shows text-only location display

---

## 🗄️ Database Schema

Jobs now store location data:

```prisma
model Job {
  // ... other fields
  location        String
  locationLat     Float?        // NEW
  locationLng     Float?        // NEW
  locationAddress String?       // NEW (from geocoding)
  salaryCurrency  String?       // NEW (USD, EUR, etc.)
  acceptApplicationsHere Boolean @default(false) // NEW
}
```

Already applied via `npx prisma db push`

---

## 🔍 Troubleshooting

### Issue: "Error loading Google Maps"

**Solution:**
- Check `.env.local` has correct API key
- Restart dev server after adding env variable
- Verify API key is not restricted to wrong domains

### Issue: "No jobs with location coordinates available"

**Cause:** Old jobs don't have lat/lng

**Solutions:**
1. Post new jobs with map picker (saves coordinates)
2. Edit existing jobs → re-select location on map
3. Run migration script (see below)

### Issue: Autocomplete not working

**Solution:**
- Verify Places API is enabled in Google Cloud Console
- Check browser console for API errors
- Ensure API key restrictions allow Places API

### Issue: Map not loading on job details

**Solution:**
- Job might not have coordinates saved
- Component will auto-geocode if needed
- Check browser console for errors

---

## 📊 Migration Script for Old Jobs

To add coordinates to existing jobs:

```javascript
// scripts/geocodeJobs.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function geocodeJobs() {
  const jobs = await prisma.job.findMany({
    where: {
      locationLat: null,
      locationLng: null,
    },
  })

  console.log(`Found ${jobs.length} jobs without coordinates`)

  for (const job of jobs) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          job.location
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
      const data = await response.json()

      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location
        await prisma.job.update({
          where: { id: job.id },
          data: {
            locationLat: lat,
            locationLng: lng,
            locationAddress: data.results[0].formatted_address,
          },
        })
        console.log(`✅ Geocoded: ${job.title} - ${job.location}`)
      }
    } catch (error) {
      console.error(`❌ Failed: ${job.title}`, error)
    }

    // Rate limiting: wait 200ms between requests
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  console.log('Geocoding complete!')
  await prisma.$disconnect()
}

geocodeJobs()
```

Run with: `node scripts/geocodeJobs.js`

---

## 🎨 Customization

### Change Marker Colors

In `GoogleJobMap.tsx`, modify `getMarkerIcon()`:

```typescript
const getMarkerIcon = (employerType?: string | null) => {
  let color = "#2563eb" // Your custom color
  // ... rest of function
}
```

### Adjust Map Height

In `GoogleJobMap.tsx`:

```typescript
const mapContainerStyle = {
  width: "100%",
  height: "600px", // Change from 500px
}
```

### Change Default Center

In `GoogleJobMap.tsx`:

```typescript
const defaultCenter = {
  lat: 40.7128, // New York
  lng: -74.0060,
}
```

---

## 📋 Component Summary

| Component | Purpose | Status |
|-----------|---------|--------|
| `GoogleMapsLocationPicker` | Job posting form picker | ✅ Complete |
| `GoogleJobMap` | Homepage multi-job map | ✅ Complete |
| `GoogleJobLocationMap` | Single job details map | ✅ Complete |
| `JobMapClient` | Homepage map wrapper | ✅ Updated |
| `JobMapSection` | Server component | ✅ Updated |
| `JobFormDialog` | Job creation/edit form | ✅ Updated |

---

## 🚀 Next Steps

1. **Configure API Key**: Add to `.env.local`
2. **Test All Maps**: Post job → View homepage → Check details
3. **Geocode Old Jobs**: Run migration script if needed
4. **Monitor Usage**: Check Google Cloud Console for API quota
5. **Set Billing**: Google Maps requires billing account (free tier available)

---

## 💰 Google Maps Pricing

**Free Tier (Monthly):**
- 28,000 map loads
- 100,000 geocoding requests
- Should be sufficient for small/medium sites

**After Free Tier:**
- ~$7 per 1,000 map loads
- ~$5 per 1,000 geocoding requests

**Optimization Tips:**
- Limit map loads with dynamic imports ✅ (already done)
- Cache geocoding results ✅ (store in database)
- Use clustering ✅ (already implemented)

---

## ✨ Features Gained

Compared to Leaflet:

✅ **Better UX**: Autocomplete search, smooth animations  
✅ **Reliability**: Professional-grade infrastructure  
✅ **Features**: Street View, satellite imagery, directions  
✅ **Maintenance**: No Leaflet icon path issues  
✅ **Mobile**: Better touch interactions  
✅ **Geocoding**: More accurate location resolution  

---

All map functionality is now using Google Maps! 🎉
