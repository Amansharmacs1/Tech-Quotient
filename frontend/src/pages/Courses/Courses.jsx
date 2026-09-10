import React, { useState, useEffect } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCourses, deleteCourse } from '../../services/courseService';

import CourseStats from '../../components/course/CourseStats';
import SearchFilter from '../../components/course/SearchFilter';
import CourseCard from '../../components/course/CourseCard';
import CourseTable from '../../components/course/CourseTable';
import EmptyCourseState from '../../components/course/EmptyCourseState';
import DeleteCourseModal from '../../components/course/DeleteCourseModal';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError('Unable to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (courseToDelete) {
      try {
        await deleteCourse(courseToDelete._id);
        setCourses(courses.filter(c => c._id !== courseToDelete._id));
        setDeleteModalOpen(false);
        setCourseToDelete(null);
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  // Filter and Sort Logic (client-side for now, could be moved to server)
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? course.status === filterStatus : true;
    const matchesSemester = filterSemester ? course.semester === filterSemester : true;
    return matchesSearch && matchesStatus && matchesSemester;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.courseName.localeCompare(b.courseName);
    if (sortBy === 'semester') return (a.semester || '').localeCompare(b.semester || '');
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-1">Course Management</h1>
          <p className="text-gray-500">Manage all your courses from one place.</p>
        </div>
        <Link
          to="/courses/create"
          className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm shadow-primary/30"
        >
          <Plus size={20} />
          Create Course
        </Link>
      </div>

      <CourseStats courses={courses} />

      <SearchFilter 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        filterSemester={filterSemester} setFilterSemester={setFilterSemester}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {/* View Toggle */}
      {courses.length > 0 && (
        <div className="flex justify-end mb-4">
          <div className="bg-white border border-gray-200 rounded-lg flex p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-accent text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'table' ? 'bg-accent text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Course Display */}
      {loading ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
          Loading courses...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 bg-red-50 rounded-xl border border-red-100">
          {error}
        </div>
      ) : courses.length === 0 ? (
        <EmptyCourseState />
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
          No courses match your search criteria.
        </div>
      ) : (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course._id} course={course} onDeleteClick={handleDeleteClick} />
            ))}
          </div>
        ) : (
          <CourseTable courses={filteredCourses} onDeleteClick={handleDeleteClick} />
        )
      )}

      <DeleteCourseModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={confirmDelete}
        courseName={courseToDelete?.courseName} 
      />
    </div>
  );
};

export default Courses;
