import { useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MapLibreMap } from 'maplibre-gl';
import {
  AppBar, Box, Button, Chip, Divider, Drawer, IconButton, List, ListItemButton,
  ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography, Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ExploreIcon from '@mui/icons-material/Explore';
import NavigationIcon from '@mui/icons-material/Navigation';
import RouteIcon from '@mui/icons-material/Route';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MapIcon from '@mui/icons-material/Map';
import './styles.css';

const tileUrl = import.meta.env.VITE_MAP_TILE_URL ||
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function App() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [status, setStatus] = useState('MAP READY');
  const [coordinates, setCoordinates] = useState('Location not acquired');
  const [mapMode, setMapMode] = useState<'2D' | '3D'>('2D');

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      center: [-82.3248, 29.6516],
      zoom: 12,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [tileUrl],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-raster',
            type: 'raster',
            source: 'osm',
            paint: { 'raster-opacity': 0.94 }
          }
        ]
      }
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    map.on('load', () => setStatus('MAP READY'));
    map.on('error', () => setStatus('MAP CONNECTION ISSUE'));
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const locate = () => {
    if (!navigator.geolocation) {
      setStatus('LOCATION NOT SUPPORTED');
      return;
    }
    setStatus('ACQUIRING GPS...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 15, duration: 1200 });
        setStatus('GPS POSITION ACQUIRED');
      },
      () => setStatus('LOCATION PERMISSION OR GPS UNAVAILABLE'),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 5000 }
    );
  };

  const togglePerspective = () => {
    const next = mapMode === '2D' ? '3D' : '2D';
    setMapMode(next);
    mapRef.current?.easeTo({ pitch: next === '3D' ? 55 : 0, duration: 700 });
  };

  const menuItems = [
    { label: 'Navigation', icon: <NavigationIcon /> },
    { label: 'Trip information', icon: <RouteIcon /> },
    { label: 'Road alerts', icon: <WarningAmberIcon /> },
    { label: 'Media', icon: <MusicNoteIcon /> },
    { label: 'Map settings', icon: <MapIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> }
  ];

  return (
    <Box className="app-shell">
      <AppBar position="absolute" elevation={3} className="top-bar">
        <Toolbar variant="dense" className="toolbar">
          <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, ml: 1 }}>
            <Typography className="brand">DRIVEPOINT</Typography>
            <Typography className="brand-subtitle">NAVIGATION SYSTEM</Typography>
          </Box>
          <Chip size="small" label="GPS STANDBY" className="gps-chip" />
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 286, pt: 2 }} role="presentation">
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography className="brand">DRIVEPOINT</Typography>
            <Typography variant="caption" color="text.secondary">AUTOMOTIVE NAVIGATION</Typography>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItemButton key={item.label} onClick={() => setDrawerOpen(false)}>
                <ListItemIcon sx={{ color: '#91b7c0', minWidth: 42 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">VERSION 0.1.0 • DEVELOPMENT BUILD</Typography>
          </Box>
        </Box>
      </Drawer>

      <Box component="main" className="main-content">
        <Box className="map-heading">
          <Box>
            <Typography variant="overline" className="section-kicker">CURRENT MAP</Typography>
            <Typography variant="subtitle1" fontWeight={700}>Gainesville area</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" startIcon={<SearchIcon />} onClick={() => setStatus('DESTINATION SEARCH — COMING NEXT')}>
              Search
            </Button>
            <Button size="small" variant="contained" onClick={togglePerspective}>{mapMode}</Button>
          </Stack>
        </Box>

        <Box className="map-frame">
          <div ref={mapContainer} className="map-canvas" />
          <Paper className="map-status" elevation={3}>
            <Typography variant="caption" className="status-label">SYSTEM STATUS</Typography>
            <Typography variant="body2" fontWeight={700}>{status}</Typography>
          </Paper>
          <Stack className="map-controls" spacing={1}>
            <Tooltip title="Find my location">
              <IconButton className="map-control" onClick={locate}><MyLocationIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Compass / north up">
              <IconButton className="map-control" onClick={() => mapRef.current?.easeTo({ bearing: 0 })}><ExploreIcon /></IconButton>
            </Tooltip>
          </Stack>
          <Paper className="road-panel" elevation={3}>
            <Typography variant="caption" className="status-label">ROAD INFORMATION</Typography>
            <Typography variant="body2" fontWeight={700}>Awaiting GPS position</Typography>
            <Typography variant="caption" color="text.secondary">Road name and classification will appear here.</Typography>
          </Paper>
        </Box>

        <Box className="bottom-grid">
          <Paper className="info-panel">
            <Stack direction="row" alignItems="center" spacing={1}>
              <SpeedIcon color="primary" />
              <Typography variant="subtitle2">TRIP COMPUTER</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between">
              <Box><Typography className="metric-value">--</Typography><Typography variant="caption">GPS SPEED</Typography></Box>
              <Box><Typography className="metric-value">--</Typography><Typography variant="caption">DISTANCE</Typography></Box>
              <Box><Typography className="metric-value">--</Typography><Typography variant="caption">ETA</Typography></Box>
            </Stack>
          </Paper>
          <Paper className="info-panel location-panel">
            <Stack direction="row" alignItems="center" spacing={1}>
              <NavigationIcon color="primary" />
              <Typography variant="subtitle2">POSITION</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">{coordinates}</Typography>
            <Typography variant="caption" color="text.secondary">GPS coordinates appear after location is acquired.</Typography>
          </Paper>
        </Box>

        <Paper className="media-strip">
          <Stack direction="row" alignItems="center" spacing={1}>
            <MusicNoteIcon />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight={700}>MEDIA CONNECTION</Typography>
              <Typography variant="caption" color="text.secondary">No active media session detected</Typography>
            </Box>
            <Button size="small" variant="outlined" disabled>CONNECT</Button>
          </Stack>
        </Paper>
        <Typography className="footer-note">Map data © OpenStreetMap contributors • {status}</Typography>
      </Box>
    </Box>
  );
}
