import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import { Spinner, SkeletonCard, SkeletonTable } from '../components/common/Loader.jsx';
import Badge from '../components/common/Badge.jsx';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  TableProperties,
  KanbanSquare,
  Plus,
  Edit,
  Trash2,
  Copy,
  ChevronLeft,
  ChevronRight,
  FolderDown,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';

const Tasks = () => {
  const navigate = useNavigate();
  const {
    tasks,
    pagination,
    loading,
    filters,
    viewMode,
    fetchTasks,
    updateTask,
    deleteTask,
    duplicateTask,
    archiveTask,
    restoreTask,
    changeFilters,
    changeViewMode,
  } = useTasks();

  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  // Fetch tasks on filter change
  useEffect(() => {
    // If board view, fetch a larger limit to see all cards
    const limit = viewMode === 'board' ? 100 : 10;
    fetchTasks({ limit }).catch((err) => toast.error(err.message));
  }, [fetchTasks, viewMode, filters.status, filters.priority, filters.sortBy, filters.page, filters.search, filters.archived]);

  // Debounced search trigger
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== filters.search) {
        changeFilters({ search: searchTerm, page: 1 });
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm, filters.search, changeFilters]);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a droppable zone or in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const newStatus = destination.droppableId; // 'pending' | 'in progress' | 'completed'
    
    // Find the task in local state to pre-check
    const taskToUpdate = tasks.find((t) => t._id === draggableId);
    if (!taskToUpdate) return;

    // Call update API and toast on success
    try {
      await updateTask(draggableId, {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        priority: taskToUpdate.priority,
        dueDate: taskToUpdate.dueDate,
        assignedTo: taskToUpdate.assignedTo._id,
        status: newStatus,
      });
      toast.success(`Task status updated to: ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update task position');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this task?')) {
      try {
        await deleteTask(id);
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await duplicateTask(id);
      toast.success('Task duplicated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleArchive = async (id) => {
    try {
      await archiveTask(id);
      toast.success('Task archived successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreTask(id);
      toast.success('Task restored successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Group tasks for Board View columns
  const getBoardColumnTasks = (statusName) => {
    return tasks.filter((t) => t.status === statusName);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            {filters.archived ? <FolderDown className="h-5 w-5" /> : <FolderOpen className="h-5 w-5" />}
            {filters.archived ? 'Archived Tasks' : 'All Tasks'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage, filter, search, and drag-and-drop tasks in your workspace.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Archive list toggle button */}
          <Button
            variant="secondary"
            size="small"
            icon={filters.archived ? <FolderOpen className="h-4 w-4" /> : <FolderDown className="h-4 w-4" />}
            onClick={() => changeFilters({ archived: !filters.archived, page: 1 })}
          >
            {filters.archived ? 'Show Active' : 'Show Archives'}
          </Button>

          {!filters.archived && (
            <Button
              size="small"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => navigate('/tasks/new')}
            >
              Add Task
            </Button>
          )}
        </div>
      </div>

      {/* Toolbar / Filters bar */}
      <div className="bg-white dark:bg-slate-800 rounded-modal border border-border-light dark:border-border-dark p-4 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search bar inside toolbar */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Quick search..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-input outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Filters and Views Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter dropdown */}
          <select
            value={filters.status}
            onChange={(e) => changeFilters({ status: e.target.value, page: 1 })}
            className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-input outline-none focus:bg-white text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Priority filter dropdown */}
          <select
            value={filters.priority}
            onChange={(e) => changeFilters({ priority: e.target.value, page: 1 })}
            className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-input outline-none focus:bg-white text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          {/* Sorting filter dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) => changeFilters({ sortBy: e.target.value, page: 1 })}
            className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-input outline-none focus:bg-white text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="priority">Priority Order</option>
            <option value="deadline">Due Date</option>
          </select>

          {/* Views Toggles */}
          <div className="h-8 w-px bg-border-light dark:bg-border-dark hidden sm:block" />
          
          <div className="flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-input shrink-0">
            <button
              type="button"
              onClick={() => changeViewMode('grid')}
              className={`p-1.5 rounded-[8px] transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => changeViewMode('table')}
              className={`p-1.5 rounded-[8px] transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Table View"
            >
              <TableProperties className="h-4 w-4" />
            </button>
            {/* Board View is only visible for Active tasks (not archives) */}
            {!filters.archived && (
              <button
                type="button"
                onClick={() => changeViewMode('board')}
                className={`p-1.5 rounded-[8px] transition-colors ${
                  viewMode === 'board'
                    ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="Kanban Board View"
              >
                <KanbanSquare className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main tasks container */}
      {loading ? (
        viewMode === 'table' ? (
          <SkeletonTable rows={5} cols={5} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard count={3} />
          </div>
        )
      ) : tasks.length === 0 ? (
        /* Empty State */
        <Card className="flex flex-col items-center justify-center p-12 text-center max-w-lg mx-auto w-full mt-6">
          <div className="h-16 w-16 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-slate-450 dark:text-slate-500" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            No Tasks Found
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
            Try adjusting your search query, clearing filters, or adding a new task to your workspace.
          </p>
          {!filters.archived && (
            <Button
              size="small"
              className="mt-6"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => navigate('/tasks/new')}
            >
              Create New Task
            </Button>
          )}
        </Card>
      ) : (
        <>
          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="bg-white dark:bg-slate-800 rounded-card p-5 border border-border-light dark:border-border-dark shadow-card hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[200px]"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-2">
                      <Badge type="priority" value={task.priority} />
                      <Badge value={task.status} />
                    </div>
                    
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {task.description}
                    </p>
                    
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {task.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 font-medium">
                      Due: {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      {task.assignedTo && (
                        <Avatar
                          name={task.assignedTo.name}
                          src={task.assignedTo.avatar}
                          size="sm"
                          className="ring-2 ring-white dark:ring-slate-850"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto rounded-table border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 shadow-card">
              <table className="min-w-full text-sm text-left text-slate-500 dark:text-slate-400">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-900 border-b border-border-light dark:border-border-dark dark:text-slate-350">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">Title</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Priority</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Due Date</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Assigned To</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
                  {tasks.map((task) => (
                    <tr
                      key={task._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                      onClick={() => navigate(`/tasks/${task._id}`)}
                    >
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                        {task.title}
                      </td>
                      <td className="px-6 py-4">
                        <Badge type="priority" value={task.priority} />
                      </td>
                      <td className="px-6 py-4">
                        <Badge value={task.status} />
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">
                        {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        {task.assignedTo && (
                          <div className="flex items-center gap-2">
                            <Avatar name={task.assignedTo.name} src={task.assignedTo.avatar} size="xs" />
                            <span className="text-xs truncate">{task.assignedTo.name}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/tasks/edit/${task._id}`)}
                            className="p-1.5 text-slate-400 hover:text-primary rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            title="Edit task"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDuplicate(task._id)}
                            className="p-1.5 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            title="Duplicate task"
                          >
                            <Copy className="h-4 w-4" />
                          </button>

                          {filters.archived ? (
                            <button
                              onClick={() => handleRestore(task._id)}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                              title="Restore task"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleArchive(task._id)}
                              className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                              title="Archive task"
                            >
                              <FolderDown className="h-4 w-4" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(task._id)}
                            className="p-1.5 text-slate-400 hover:text-red-650 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            title="Delete task"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* BOARD VIEW (KANBAN) */}
          {viewMode === 'board' && !filters.archived && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {['pending', 'in progress', 'completed'].map((statusKey) => (
                  <div
                    key={statusKey}
                    className="bg-slate-100/60 dark:bg-slate-800/40 rounded-modal border border-border-light/60 dark:border-border-dark/60 p-4"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4 px-1.5">
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 capitalize">
                        {statusKey}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-650 dark:text-slate-350 rounded-badge">
                        {getBoardColumnTasks(statusKey).length}
                      </span>
                    </div>

                    <Droppable droppableId={statusKey}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex flex-col gap-4.5 min-h-[500px] rounded-card p-1 transition-all ${
                            snapshot.isDraggingOver ? 'bg-slate-200/40 dark:bg-slate-800/80' : ''
                          }`}
                        >
                          {getBoardColumnTasks(statusKey).map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                              {(p, s) => (
                                <div
                                  ref={p.innerRef}
                                  {...p.draggableProps}
                                  {...p.dragHandleProps}
                                  onClick={() => navigate(`/tasks/${task._id}`)}
                                  className={`bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark p-4 rounded-card shadow-sm cursor-pointer select-none ${
                                    s.isDragging ? 'dragging-card' : 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-650'
                                  }`}
                                >
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                      <Badge type="priority" value={task.priority} />
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                      {task.title}
                                    </h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                      {task.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700">
                                      <span className="text-[9px] text-slate-450 dark:text-slate-500 font-semibold">
                                        {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                      </span>
                                      {task.assignedTo && (
                                        <Avatar name={task.assignedTo.name} src={task.assignedTo.avatar} size="xs" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          )}

          {/* PAGINATION (Only shown in Grid or Table views) */}
          {viewMode !== 'board' && pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-4 px-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Page <span className="font-bold text-slate-800 dark:text-white">{pagination.page}</span> of {pagination.pages}
              </span>
              
              <div className="flex items-center gap-1">
                {/* Previous Button */}
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => changeFilters({ page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: pagination.pages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => changeFilters({ page: pNum })}
                      className={`h-8 w-8 text-xs font-bold rounded-btn transition-colors ${
                        pagination.page === pNum
                          ? 'bg-primary text-white'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-350 dark:hover:bg-slate-700'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => changeFilters({ page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                  className="px-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;
