
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, Phone } from 'lucide-react';
import { users } from '@/data/mockData';
import { User } from '@/types';

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'student'>('all');
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (user.skills && user.skills.some(skill => 
                            skill.toLowerCase().includes(searchTerm.toLowerCase())
                          ));
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  const adminCount = users.filter(user => user.role === 'admin').length;
  const studentCount = users.filter(user => user.role === 'student').length;
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Member Directory</h1>
        <p className="text-muted-foreground mt-1">
          View and search all ACES committee members and students
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Badge 
            variant={roleFilter === 'all' ? 'default' : 'outline'} 
            className="px-4 py-2 cursor-pointer"
            onClick={() => setRoleFilter('all')}
          >
            All ({users.length})
          </Badge>
          <Badge 
            variant={roleFilter === 'admin' ? 'default' : 'outline'} 
            className="px-4 py-2 cursor-pointer"
            onClick={() => setRoleFilter('admin')}
          >
            Committee ({adminCount})
          </Badge>
          <Badge 
            variant={roleFilter === 'student' ? 'default' : 'outline'} 
            className="px-4 py-2 cursor-pointer"
            onClick={() => setRoleFilter('student')}
          >
            Students ({studentCount})
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <MemberCard key={user.id} user={user} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No members found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MemberCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img 
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}`} 
            alt={user.name} 
            className="h-16 w-16 rounded-full" 
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold truncate">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.year}</p>
              </div>
              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                {user.role === 'admin' ? 'Committee' : 'Student'}
              </Badge>
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-1" />
              <span className="truncate">{user.email}</span>
            </div>
            {user.skills && user.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Members;
