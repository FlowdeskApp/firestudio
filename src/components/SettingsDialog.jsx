import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Switch,
    FormControlLabel,
    Divider,
    IconButton,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    SettingsBrightness as AutoModeIcon,
} from '@mui/icons-material';
import { useSettings } from '../context/SettingsContext';

function SettingsDialog({ open, onClose }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const { settings, updateSetting, resetSettings } = useSettings();

    const isSelected = (value) => settings.theme === value;

    const ThemeButton = ({ value, icon: Icon, label }) => (
        <Box
            onClick={() => updateSetting('theme', value)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                border: '2px solid',
                borderColor: isSelected(value)
                    ? (isDark ? '#90caf9' : 'primary.main')
                    : (isDark ? '#555' : '#e0e0e0'),
                borderRadius: 2,
                cursor: 'pointer',
                minWidth: 80,
                backgroundColor: isSelected(value)
                    ? (isDark ? 'rgba(144, 202, 249, 0.15)' : 'rgba(25, 118, 210, 0.08)')
                    : (isDark ? '#2a2a2a' : '#fff'),
                '&:hover': {
                    borderColor: isSelected(value)
                        ? (isDark ? '#90caf9' : 'primary.main')
                        : (isDark ? '#777' : '#bdbdbd'),
                    backgroundColor: isSelected(value)
                        ? (isDark ? 'rgba(144, 202, 249, 0.2)' : 'rgba(25, 118, 210, 0.12)')
                        : (isDark ? '#333' : '#f5f5f5'),
                },
            }}
        >
            <Icon sx={{
                fontSize: 28,
                mb: 0.5,
                color: isSelected(value)
                    ? (isDark ? '#90caf9' : 'primary.main')
                    : (isDark ? '#fff' : '#666')
            }} />
            <Typography variant="caption" sx={{
                color: isSelected(value)
                    ? (isDark ? '#90caf9' : 'primary.main')
                    : (isDark ? '#fff' : '#666'),
                fontWeight: isSelected(value) ? 600 : 400
            }}>
                {label}
            </Typography>
        </Box>
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box component="span">Settings</Box>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                {/* Theme Section */}
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Appearance
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <ThemeButton value="light" icon={LightModeIcon} label="Light" />
                    <ThemeButton value="dark" icon={DarkModeIcon} label="Dark" />
                    <ThemeButton value="auto" icon={AutoModeIcon} label="Auto" />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Default Settings Section */}
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Default Settings
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Default Document Limit"
                        type="number"
                        value={settings.defaultDocLimit}
                        onChange={(e) => updateSetting('defaultDocLimit', parseInt(e.target.value) || 50)}
                        size="small"
                        inputProps={{ min: 1, max: 1000 }}
                        helperText="Number of documents to fetch by default (1-1000)"
                    />

                    <FormControl size="small">
                        <InputLabel>Default View Type</InputLabel>
                        <Select
                            value={settings.defaultViewType}
                            label="Default View Type"
                            onChange={(e) => updateSetting('defaultViewType', e.target.value)}
                        >
                            <MenuItem value="table">Table</MenuItem>
                            <MenuItem value="tree">Tree</MenuItem>
                            <MenuItem value="json">JSON</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel>Font Size</InputLabel>
                        <Select
                            value={settings.fontSize}
                            label="Font Size"
                            onChange={(e) => updateSetting('fontSize', e.target.value)}
                        >
                            <MenuItem value="small">Small</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="large">Large</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Data Type Display Section */}
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Data Type Display
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl size="small">
                        <InputLabel>Timestamp Format</InputLabel>
                        <Select
                            value={settings.timestampFormat}
                            label="Timestamp Format"
                            onChange={(e) => updateSetting('timestampFormat', e.target.value)}
                        >
                            <MenuItem value="iso">ISO 8601 (2024-01-15T10:30:00Z)</MenuItem>
                            <MenuItem value="local">Local (Jan 15, 2024 10:30 AM)</MenuItem>
                            <MenuItem value="utc">UTC (Mon, 15 Jan 2024 10:30:00 GMT)</MenuItem>
                            <MenuItem value="unix">Unix Timestamp (1705315800)</MenuItem>
                            <MenuItem value="relative">Relative (2 hours ago)</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>Number Format</InputLabel>
                            <Select
                                value={settings.numberFormat}
                                label="Number Format"
                                onChange={(e) => updateSetting('numberFormat', e.target.value)}
                            >
                                <MenuItem value="auto">Auto (as-is)</MenuItem>
                                <MenuItem value="fixed">Fixed Decimal</MenuItem>
                                <MenuItem value="thousands">With Separators (1,234.56)</MenuItem>
                                <MenuItem value="scientific">Scientific (1.23e+4)</MenuItem>
                            </Select>
                        </FormControl>
                        {settings.numberFormat === 'fixed' && (
                            <TextField
                                label="Decimals"
                                type="number"
                                value={settings.numberDecimalPlaces}
                                onChange={(e) => updateSetting('numberDecimalPlaces', Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
                                size="small"
                                inputProps={{ min: 0, max: 10 }}
                                sx={{ width: 90 }}
                            />
                        )}
                    </Box>

                    <FormControl size="small">
                        <InputLabel>GeoPoint Format</InputLabel>
                        <Select
                            value={settings.geopointFormat}
                            label="GeoPoint Format"
                            onChange={(e) => updateSetting('geopointFormat', e.target.value)}
                        >
                            <MenuItem value="decimal">Decimal (37.7749, -122.4194)</MenuItem>
                            <MenuItem value="dms">DMS (37°46'29.6"N 122°25'9.8"W)</MenuItem>
                            <MenuItem value="compact">Compact (37.77,-122.42)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Behavior Section */}
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Behavior
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.autoExpandDocuments}
                                onChange={(e) => updateSetting('autoExpandDocuments', e.target.checked)}
                            />
                        }
                        label="Auto-expand documents in tree view"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.showTypeColumn}
                                onChange={(e) => updateSetting('showTypeColumn', e.target.checked)}
                            />
                        }
                        label="Show Type column in tree view"
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={resetSettings} color="inherit">
                    Reset to Defaults
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={onClose} variant="contained">
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SettingsDialog;
