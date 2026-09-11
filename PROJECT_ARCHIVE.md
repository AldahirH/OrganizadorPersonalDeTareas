# OrganizadorPersonalDeTareas - Project Archive

## Project Overview
A simple personal task organizer web application built with HTML5, CSS3, and vanilla JavaScript. The application allows users to manage daily tasks with add, edit, delete, and completion tracking features.

## Project Structure

```
OrganizadorPersonalDeTareas/
├── .git/                     # Git repository metadata
├── LICENSE                   # License file
├── README.txt                # Basic README (currently contains placeholder text)
├── css/
│   └── style.css             # Main stylesheet with custom properties and responsive design
├── html/
│   └── index.html            # Main application HTML structure
└── js/
    └── script.js             # JavaScript file (currently empty - logic to be implemented)
```

## Technology Stack
- **HTML5**: Semantic structure with accessible elements
- **CSS3**: Custom properties (variables), Flexbox, Grid, responsive design
- **Vanilla JavaScript**: ES6+ module pattern (file exists but is currently empty)
- **Lucide Icons**: Used for SVG icons throughout the UI

## Key Features

### UI Components
1. **Task Summary Cards** - Shows total tasks, pending, and completed counts
2. **Add Task Form** - Input field + due date + submit button
3. **Task List** - Each task shows:
   - Checkbox for completion status
   - Task title and due date
   - Edit and delete action buttons
4. **Filter Controls** - Buttons to filter by: All, Pending, Completed
5. **Search Bar** - Magnifying glass input to search tasks

### Responsive Design
- **Desktop (>800px)**: Three-column summary grid, horizontal filters, side-by-side form layout
- **Tablet (600-800px)**: Stacked form and filters, reduced spacing
- **Mobile (<600px)**: Compact padding, smaller dimensions, stacked layout

## CSS Custom Properties (Variables)
Defined in `:root` at `css/style.css:1-26`:

| Variable | Value | Description |
|---|---|---|
| `--color-fondo` | `#F6F7FB` | Page background color |
| `--color-tarjetas` | `#FFFFFF` | Card/element background |
| `--color-principal` | `#4F46E5` | Primary action color (Indigo) |
| `--color-texto` | `#172033` | Main text color |
| `--color-borde` | `#E0E0E0` | Border color |
| `--color-texto-secundario` | `#596582` | Secondary/ muted text |
| `--color-hoy` | `#92400E` | "Today" badge color (Amber) |
| `--color-completadas` | `#16A34A` | Completed tasks color (Green) |
| `--color-eliminar` | `#DC2626` | Delete button color (Red) |
| `--color-filtro` | `#EEF1F8` | Filter/button background |
| `--fuente-principal` | `Arial, sans-serif` | Base font family |
| `--tamano-icono` | `24px` | Default icon size |
| `--radio-contenedor` | `12px` | Container border radius |
| `--ancho-contenido` | `1100px` | Max container width |

## HTML Structure Highlights

### Main Layout (`html/index.html`)
- **`main.ContenedorPrincipal`**: Centered container with max-width, padding, border, and rounded corners
- **`header.ContenedorTituloAplicacion`**: Application title with SVG icon and subtitle
- **`div.ContenedorPendientes`**: Summary statistics grid (Total/Pending/Completed)
- **`div.ContenedorAgregarTarea`**: Form for adding new tasks
- **`div.ContenedorMisTareas`**: Main task list container with filters and search

### Task List Item (`li.Tarea`)
- Flex row layout with checkbox, description, due date, and action buttons
- Supports `checked` state for completed tasks (strikethrough text, gray color)
- Action buttons: edit (pencil icon) and delete (trash icon)

### Responsive Breakpoints
- `@media (max-width: 800px)`: Stack form fields and filter bars into columns
- `@media (max-width: 600px)`: Full responsive reset - smaller padding, icon sizes, font sizes

## JavaScript (`js/script.js`)
- Currently empty (0 lines)
- Expected to handle:
  - Adding new tasks
  - Toggling task completion
  - Editing tasks
  - Deleting tasks
  - Filtering tasks by status
  - Searching tasks
  - LocalStorage persistence (likely planned)

## Git History
Recent commits (`git log --oneline -10`):
1. `6c57101` - Fin dela codificacion HTML y CSS
2. `36b8e11` - Cambio de Contenedores de tareas a lista de tareas
3. `e9bdc37` - Correcciones/Optimización de codigo con ayuda de la IA
4. `f2b5956` - Commit de aseguramiento
5. `a81283a` - Commit de guardado
6. `6c5f368` - Commit de html terminado
7. `4fe1110` - Commit de html terminado
8. `e06943d` - Commit de esqueleto html
9. `d3b7e66` - Segunda prueba
10. `4bb2c11` - Initial commit

## License
See `LICENSE` file for full license terms.

## How to Run
1. Open `html/index.html` in any modern web browser
2. Or use a local development server (e.g., `npx serve`, `python -m http.server`)
3. The application is fully client-side - no backend or build steps required

## Notes for AI Assistants
- The HTML structure is semantic and accessible
- CSS uses CSS custom properties for theming consistency
- JavaScript file is empty - logic needs to be implemented
- All colors and spacing are defined as CSS variables for easy theming
- Responsive design covers mobile to desktop ranges
- Uses modern CSS features (Flexbox, Grid, `clamp()`, CSS variables)