# Configuration file for Plant Seeds Cook website

import os


class Config:
    """Base configuration class"""

    SECRET_KEY = os.environ.get("SECRET_KEY") or "dev-secret-key-change-in-production"
    DATABASE_URL = os.environ.get("DATABASE_URL") or "plantseedscook.db"
    DEBUG = os.environ.get("DEBUG", "False").lower() == "true"


class DevelopmentConfig(Config):
    """Development configuration"""

    DEBUG = True


class ProductionConfig(Config):
    """Production configuration"""

    DEBUG = False


# Configuration dictionary
config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
