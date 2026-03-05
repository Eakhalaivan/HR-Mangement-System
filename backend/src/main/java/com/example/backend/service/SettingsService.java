package com.example.backend.service;

import com.example.backend.entity.Settings;
import com.example.backend.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    public Settings getSettings() {
        return settingsRepository.findAll().stream().findFirst().orElseGet(this::createDefaultSettings);
    }

    public Settings updateSettings(Settings settingsDetails) {
        Settings settings = getSettings();
        settings.setSystemName(settingsDetails.getSystemName());
        settings.setAdminEmail(settingsDetails.getAdminEmail());
        settings.setPersistenceMode(settingsDetails.getPersistenceMode());
        settings.setNotifications(settingsDetails.isNotifications());
        return settingsRepository.save(settings);
    }

    private Settings createDefaultSettings() {
        Settings defaultSettings = new Settings();
        defaultSettings.setSystemName("HR Nexus");
        defaultSettings.setAdminEmail("admin@hrnexus.com");
        defaultSettings.setPersistenceMode("H2 (Development)");
        defaultSettings.setNotifications(true);
        return settingsRepository.save(defaultSettings);
    }
}
