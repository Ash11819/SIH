export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'pothole' | 'sanitation' | 'streetlight' | 'water' | 'corruption' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images?: string[];
  isAnonymous: boolean;
  reportedBy: string;
  reportedAt: Date;
  upvotes: number;
  assignedTo?: string;
  departmentId?: string;
  estimatedResolution?: Date;
  actualResolution?: Date;
}

export interface Department {
  id: string;
  name: string;
  type: 'municipal' | 'police' | 'health' | 'transport' | 'ngo';
  contactInfo: {
    email: string;
    phone: string;
  };
  performance: {
    totalAssigned: number;
    resolved: number;
    avgResponseTime: number; // in hours
    rating: number;
  };
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin' | 'department';
  departmentId?: string;
  reportedIssues: string[];
  upvotedIssues: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  type: 'resolution' | 'announcement' | 'appreciation';
  publishedAt: Date;
  departmentId?: string;
  relatedIssueId?: string;
  image?: string;
}