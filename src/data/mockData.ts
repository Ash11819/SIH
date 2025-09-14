import { Issue, Department, NewsItem } from '../types';

export const mockDepartments: Department[] = [
  {
    id: 'municipal-corp',
    name: 'Municipal Corporation',
    type: 'municipal',
    contactInfo: { email: 'municipal@city.gov.in', phone: '+91-11-2345-6789' },
    performance: { totalAssigned: 245, resolved: 198, avgResponseTime: 18, rating: 4.2 },
    color: '#1E40AF'
  },
  {
    id: 'police-dept',
    name: 'Police Department',
    type: 'police',
    contactInfo: { email: 'police@city.gov.in', phone: '+91-11-100' },
    performance: { totalAssigned: 87, resolved: 71, avgResponseTime: 6, rating: 4.5 },
    color: '#DC2626'
  },
  {
    id: 'health-dept',
    name: 'Health Department',
    type: 'health',
    contactInfo: { email: 'health@city.gov.in', phone: '+91-11-108' },
    performance: { totalAssigned: 156, resolved: 142, avgResponseTime: 12, rating: 4.3 },
    color: '#059669'
  },
  {
    id: 'transport-dept',
    name: 'Transport Department',
    type: 'transport',
    contactInfo: { email: 'transport@city.gov.in', phone: '+91-11-1033' },
    performance: { totalAssigned: 203, resolved: 167, avgResponseTime: 24, rating: 3.8 },
    color: '#EA580C'
  }
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    description: 'Deep pothole causing traffic issues and potential vehicle damage',
    category: 'pothole',
    priority: 'high',
    status: 'in-progress',
    location: { lat: 28.6139, lng: 77.2090, address: 'Main Street, Connaught Place, New Delhi' },
    images: ['https://images.pexels.com/photos/1006121/pexels-photo-1006121.jpeg'],
    isAnonymous: false,
    reportedBy: 'citizen-1',
    reportedAt: new Date('2024-01-15T10:30:00'),
    upvotes: 23,
    assignedTo: 'municipal-corp',
    departmentId: 'municipal-corp',
    estimatedResolution: new Date('2024-01-20T18:00:00')
  },
  {
    id: '2',
    title: 'Overflowing Garbage Bin',
    description: 'Garbage bin near market area is overflowing for 3 days',
    category: 'sanitation',
    priority: 'medium',
    status: 'assigned',
    location: { lat: 28.6304, lng: 77.2177, address: 'Karol Bagh Market, New Delhi' },
    images: ['https://images.pexels.com/photos/2827735/pexels-photo-2827735.jpeg'],
    isAnonymous: false,
    reportedBy: 'citizen-2',
    reportedAt: new Date('2024-01-16T14:15:00'),
    upvotes: 15,
    assignedTo: 'municipal-corp',
    departmentId: 'municipal-corp'
  },
  {
    id: '3',
    title: 'Broken Street Light',
    description: 'Street light has been non-functional for over a week, creating safety concerns',
    category: 'streetlight',
    priority: 'medium',
    status: 'reported',
    location: { lat: 28.5355, lng: 77.3910, address: 'Sector 18, Noida' },
    isAnonymous: true,
    reportedBy: 'anonymous',
    reportedAt: new Date('2024-01-17T09:45:00'),
    upvotes: 8
  }
];

export const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Municipal Corporation Successfully Resolves 50+ Potholes This Week',
    content: 'Thanks to citizen reports and community upvoting, our road maintenance team has successfully filled over 50 potholes across the city this week. Special appreciation to the team for their quick response.',
    type: 'appreciation',
    publishedAt: new Date('2024-01-17T16:00:00'),
    departmentId: 'municipal-corp',
    image: 'https://images.pexels.com/photos/5922214/pexels-photo-5922214.jpeg'
  },
  {
    id: 'news-2',
    title: 'New Water Quality Testing Initiative Launched',
    content: 'Health Department announces new initiative for real-time water quality monitoring in response to citizen concerns.',
    type: 'announcement',
    publishedAt: new Date('2024-01-16T11:30:00'),
    departmentId: 'health-dept'
  },
  {
    id: 'news-3',
    title: 'Traffic Signal Restored at Busy Junction',
    content: 'After 12 hours of reported malfunction, the traffic signal at the city center junction has been fully restored.',
    type: 'resolution',
    publishedAt: new Date('2024-01-15T20:15:00'),
    relatedIssueId: '1'
  }
];