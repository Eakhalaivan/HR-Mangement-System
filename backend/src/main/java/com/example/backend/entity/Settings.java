package com.example.backend.entity;

import javax.persistence.*;
@Entity
@Table(name = "settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "system_name", nullable = false)
    private String systemName;

    @Column(name = "admin_email", nullable = false)
    private String adminEmail;

    @Column(name = "persistence_mode")
    private String persistenceMode;

    private boolean notifications;

    public Settings() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSystemName() { return systemName; }
    public void setSystemName(String systemName) { this.systemName = systemName; }
    public String getAdminEmail() { return adminEmail; }
    public void setAdminEmail(String adminEmail) { this.adminEmail = adminEmail; }
    public String getPersistenceMode() { return persistenceMode; }
    public void setPersistenceMode(String persistenceMode) { this.persistenceMode = persistenceMode; }
    public boolean isNotifications() { return notifications; }
    public void setNotifications(boolean notifications) { this.notifications = notifications; }
}
