import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiUser, FiMail, FiPhone, FiLock, FiMapPin, FiTool, FiZap, FiTruck, 
    FiDroplet, FiLayout, FiSettings, FiCheckCircle, FiArrowRight, 
    FiArrowLeft, FiEye, FiEyeOff, FiUploadCloud, FiTrash2, FiClock,
    FiCoffee, FiAward, FiUsers, FiInfo, FiSearch, FiCamera, FiShield,
    FiWifi, FiPackage, FiChevronDown, FiAlertCircle, FiX, FiCheck
} from "react-icons/fi";
import { FaWhatsapp, FaFacebook, FaInstagram, FaBuilding } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./RegisterPage.css";

// Reusable Components
const SelectionTile = ({ icon: Icon, label, selected, onClick, hasPrice, t, priceValue, onPriceChange }) => (
    <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`service-card ${selected ? 'selected' : ''}`}
        onClick={onClick}
    >
        <div className="card-icon"><Icon /></div>
        <div className="card-label">{label}</div>
        {selected && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="selection-badge">
                <FiCheckCircle />
            </motion.div>
        )}
        {selected && hasPrice && (
            <div className="service-price-input" onClick={e => e.stopPropagation()}>
                <input 
                    type="text" 
                    placeholder={t("register.price_approx")} 
                    value={priceValue}
                    onChange={(e) => onPriceChange(e.target.value)}
                />
            </div>
        )}
    </motion.div>
);

// Toast Notification Component
const Toast = ({ toast, onClose }) => {
    if (!toast) return null;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`toast toast-${toast.type}`}
        >
            <div className="toast-content">
                {toast.type === 'error' && <FiAlertCircle />}
                {toast.type === 'success' && <FiCheck />}
                <span>{toast.message}</span>
            </div>
            <button onClick={onClose} className="toast-close">
                <FiX />
            </button>
        </motion.div>
    );
};

// Enhanced Input Component
const EnhancedInput = ({ 
    icon: Icon, 
    name, 
    value, 
    onChange, 
    onBlur,
    placeholder, 
    type = "text",
    error,
    touched,
    required = false,
    tooltip,
    ...props 
}) => {
    const hasError = touched && error;
    
    return (
        <div className="input-wrapper">
            {Icon && <Icon className={`input-icon ${hasError ? 'error' : ''}`} />}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={hasError ? 'error' : ''}
                aria-label={placeholder}
                aria-required={required}
                aria-invalid={hasError}
                {...props}
            />
            {tooltip && (
                <div className="input-tooltip">
                    <FiInfo />
                    <span className="tooltip-text">{tooltip}</span>
                </div>
            )}
            {hasError && (
                <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="error-message"
                >
                    <FiAlertCircle /> {error}
                </motion.div>
            )}
        </div>
    );
};

const DaySchedule = ({ day, data, onToggle, onTimeChange, t }) => (
    <div className={`day-row ${data.active ? 'active' : ''}`}>
        <span className="day-name">{t(`days.${day}`)}</span>
        <div className={`time-inputs ${!data.active ? 'disabled' : ''}`}>
            <input 
                type="time" 
                value={data.from} 
                onChange={(e) => onTimeChange(day, 'from', e.target.value)}
                disabled={!data.active}
            />
            <span className="time-separator">{t("register.from")}</span>
            <input 
                type="time" 
                value={data.to} 
                onChange={(e) => onTimeChange(day, 'to', e.target.value)}
                disabled={!data.active}
            />
            <span className="time-separator">{t("register.to")}</span>
        </div>
        <button 
            type="button"
            className={`day-status-btn ${data.active ? 'open' : 'closed'}`}
            onClick={() => onToggle(day)}
        >
            {data.active ? t("register.open") : t("register.closed")}
        </button>
    </div>
);

const RegisterPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});

    // Form State
    const [formData, setFormData] = useState({
        ownerName: "",
        workshopName: "",
        email: "",
        phone: "",
        password: "",
        commercialRegistration: "",
        region: "",
        address: "",
        whatsappNumber: "",
        facebookPage: "",
        instagramLink: "",
        services: [], // Array of {id, price}
        emergency: false,
        amenities: [],
        experience: 0,
        staffCount: 0,
        about: "",
        images: [],
        schedule: {
            sat: { active: true, from: "08:00", to: "18:00" },
            sun: { active: true, from: "08:00", to: "18:00" },
            mon: { active: true, from: "08:00", to: "18:00" },
            tue: { active: true, from: "08:00", to: "18:00" },
            wed: { active: true, from: "08:00", to: "18:00" },
            thu: { active: true, from: "08:00", to: "18:00" },
            fri: { active: false, from: "08:00", to: "18:00" }
        }
    });

    useEffect(() => { window.scrollTo(0, 0); }, [step]);
    
    // Auto-save to localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('registerFormData');
        if (savedData && !isSubmitted) {
            try {
                const parsed = JSON.parse(savedData);
                setFormData(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }, []);

    useEffect(() => {
        if (!isSubmitted) {
            localStorage.setItem('registerFormData', JSON.stringify(formData));
        }
    }, [formData, isSubmitted]);

    // Validation functions
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'ownerName':
                if (!value.trim()) error = t('register.validation.ownerName_required');
                else if (value.trim().length < 3) error = t('register.validation.ownerName_min');
                break;
            case 'workshopName':
                if (!value.trim()) error = t('register.validation.workshopName_required');
                else if (value.trim().length < 3) error = t('register.validation.workshopName_min');
                break;
            case 'email':
                if (!value.trim()) error = t('register.validation.email_required');
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = t('register.validation.email_invalid');
                break;
            case 'password':
                if (!value) error = t('register.validation.password_required');
                else if (value.length < 8) error = t('register.validation.password_min');
                else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) error = t('register.validation.password_pattern');
                break;
            case 'whatsappNumber':
                if (value && !/^9\d{8}$/.test(value.replace(/\s/g, ''))) error = t('register.validation.phone_invalid');
                break;
            case 'region':
                if (step === 2 && !value) error = t('register.validation.region_required');
                break;
            case 'address':
                if (step === 2 && !value.trim()) error = t('register.validation.address_required');
                break;
        }
        return error;
    };

    const validateStep = (stepNum) => {
        const newErrors = {};
        let isValid = true;

        if (stepNum === 1) {
            ['ownerName', 'workshopName', 'email', 'password'].forEach(field => {
                const error = validateField(field, formData[field]);
                if (error) {
                    newErrors[field] = error;
                    isValid = false;
                }
            });
        } else if (stepNum === 2) {
            ['region', 'address'].forEach(field => {
                const error = validateField(field, formData[field]);
                if (error) {
                    newErrors[field] = error;
                    isValid = false;
                }
            });
        } else if (stepNum === 3) {
            if (formData.services.length === 0) {
                newErrors.services = t('register.validation.services_required');
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Validate on change if field was touched
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const toggleService = (id) => {
        setFormData(prev => {
            const exists = prev.services.find(s => s.id === id);
            if (exists) {
                return { ...prev, services: prev.services.filter(s => s.id !== id) };
            }
            return { ...prev, services: [...prev.services, { id, price: "" }] };
        });
    };

    const updateServicePrice = (id, price) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.map(s => s.id === id ? { ...s, price } : s)
        }));
    };

    const toggleAmenity = (id) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(id) 
                ? prev.amenities.filter(a => a !== id) 
                : [...prev.amenities, id]
        }));
    };

    const handleStepChange = (field, type) => {
        setFormData(prev => ({
            ...prev,
            [field]: type === 'up' ? prev[field] + 1 : Math.max(0, prev[field] - 1)
        }));
    };

    const toggleDay = (day) => {
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [day]: { ...prev.schedule[day], active: !prev.schedule[day].active }
            }
        }));
    };

    const updateTime = (day, field, val) => {
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [day]: { ...prev.schedule[day], [field]: val }
            }
        }));
    };

    const nextStep = async () => {
        if (validateStep(step)) {
            setIsLoading(true);
            // Mark services as touched if step 3
            if (step === 3) {
                setTouched(prev => ({ ...prev, services: true }));
            }
            // Simulate brief loading
            await new Promise(resolve => setTimeout(resolve, 300));
            setIsLoading(false);
            setDirection(1);
            setStep(s => s + 1);
        } else {
            // Mark all fields in current step as touched
            if (step === 1) {
                ['ownerName', 'workshopName', 'email', 'password'].forEach(field => {
                    setTouched(prev => ({ ...prev, [field]: true }));
                });
            } else if (step === 2) {
                ['region', 'address'].forEach(field => {
                    setTouched(prev => ({ ...prev, [field]: true }));
                });
            } else if (step === 3) {
                setTouched(prev => ({ ...prev, services: true }));
            }
            setToast({ type: 'error', message: t('register.validation.please_fix_errors') });
            setTimeout(() => setToast(null), 3000);
        }
    };
    
    const prevStep = () => { 
        setDirection(-1); 
        setStep(s => s - 1); 
    };

    // Navigation logic
    const stepVariants = {
        initial: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
        animate: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 })
    };

    const passwordStrength = useMemo(() => {
        if (!formData.password) return 0;
        let strength = 0;
        if (formData.password.length > 6) strength += 1;
        if (/[A-Z]/.test(formData.password)) strength += 1;
        if (/[0-9]/.test(formData.password)) strength += 1;
        return strength;
    }, [formData.password]);

    // File upload handler with validation
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files || []);
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        
        const validFiles = [];
        const invalidFiles = [];
        
        files.forEach(file => {
            if (file.size > maxSize) {
                invalidFiles.push({ file, reason: t('register.file_too_large') });
            } else if (!allowedTypes.includes(file.type)) {
                invalidFiles.push({ file, reason: t('register.file_type_invalid') });
            } else {
                validFiles.push(file);
            }
        });
        
        if (invalidFiles.length > 0) {
            setToast({ 
                type: 'error', 
                message: `${invalidFiles.length} ${t('register.files_rejected')}: ${invalidFiles[0].reason}` 
            });
            setTimeout(() => setToast(null), 5000);
        }
        
        if (validFiles.length > 0) {
            setFormData(prev => ({ ...prev, images: [...prev.images, ...validFiles] }));
            setToast({ 
                type: 'success', 
                message: `${validFiles.length} ${t('register.files_uploaded')}` 
            });
            setTimeout(() => setToast(null), 3000);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files);
        const fileInput = document.getElementById('file-upload');
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
        handleFileUpload({ target: { files: dataTransfer.files } });
    };

    return (
        <div className="register-page" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <Navbar />
            {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
            <div className="register-card" style={{ marginTop: '120px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, color: '#d1b3ff', marginBottom: '10px' }}>
                    {t("register.title")}
                </h1>
                <p className="register-subtitle">
                    {t("register.subtitle")}
                </p>
                
                {/* Stepper */}
                <div className="stepper-container">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`step-item ${step === i ? 'active' : ''} ${step > i ? 'completed' : ''}`}>
                            <div className="step-circle">{step > i ? '✔' : i}</div>
                            <div className="step-label">{t(`register.step${i}_label`)}</div>
                        </div>
                    ))}
                </div>

                <div className="step-progress-text">
                    {t(`register.step_counter_${step}`, { current: step, total: 4 }) || `Step ${step} of 4`}
                </div>

                <form onSubmit={e => e.preventDefault()}>
                    <AnimatePresence mode="wait" custom={direction}>
                        {step === 1 && (
                            <motion.div key="s1" custom={direction} variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="step-container">
                                {/* Account Information Section */}
                                <div className="glass-section">
                                    <div className="section-title"><FiUser /> {t("register.section_account")}</div>
                                    <EnhancedInput
                                        icon={FiUser}
                                        name="ownerName"
                                        value={formData.ownerName}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder={t("register.owner_name")}
                                        error={errors.ownerName}
                                        touched={touched.ownerName}
                                        required
                                    />
                                    <EnhancedInput
                                        icon={FaBuilding}
                                        name="workshopName"
                                        value={formData.workshopName}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder={t("register.workshop_name")}
                                        error={errors.workshopName}
                                        touched={touched.workshopName}
                                        required
                                    />
                                    <EnhancedInput
                                        icon={FiMail}
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder={t("register.email")}
                                        error={errors.email}
                                        touched={touched.email}
                                        required
                                    />
                                    <div className="input-wrapper">
                                        <FiLock className={`input-icon ${touched.password && errors.password ? 'error' : ''}`} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder={t("register.password")}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={touched.password && errors.password ? 'error' : ''}
                                            aria-label={t("register.password")}
                                            aria-required="true"
                                            aria-invalid={touched.password && !!errors.password}
                                        />
                                        <div className="eye-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? t("register.hide_password") : t("register.show_password")}>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                        {formData.password && (
                                            <div className="password-strength-container">
                                                <div className="password-meter">
                                                    <div className="meter-fill" style={{ 
                                                        width: `${(passwordStrength / 3) * 100}%`,
                                                        background: passwordStrength === 1 ? '#ff4d4d' : passwordStrength === 2 ? '#ffa500' : '#4caf50'
                                                    }}></div>
                                                </div>
                                                <div className="password-strength-text">
                                                    {passwordStrength === 0 && <span className="weak">{t("register.password_weak")}</span>}
                                                    {passwordStrength === 1 && <span className="medium">{t("register.password_medium")}</span>}
                                                    {passwordStrength === 2 && <span className="strong">{t("register.password_strong")}</span>}
                                                    {passwordStrength === 3 && <span className="very-strong">{t("register.password_very_strong")}</span>}
                                                </div>
                                            </div>
                                        )}
                                        {touched.password && errors.password && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="error-message"
                                            >
                                                <FiAlertCircle /> {errors.password}
                                            </motion.div>
                                        )}
                                    </div>
                                    <EnhancedInput
                                        icon={FiShield}
                                        name="commercialRegistration"
                                        value={formData.commercialRegistration}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder={t("register.commercial_registration")}
                                        error={errors.commercialRegistration}
                                        touched={touched.commercialRegistration}
                                        tooltip={t("register.commercial_registration_tooltip")}
                                    />
                                </div>

                                {/* Documents Section */}
                                <div className="glass-section">
                                    <div className="section-title"><FiCamera /> {t("register.documents_title")}</div>
                                    <p className="documents-desc">{t("register.documents_desc")}</p>
                                    <div 
                                        className="dropzone" 
                                        onClick={() => document.getElementById('file-upload').click()}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={t("register.upload_hint")}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                document.getElementById('file-upload').click();
                                            }
                                        }}
                                    >
                                        <FiUploadCloud className="upload-icon" />
                                        <p className="upload-hint">{t("register.upload_hint")}</p>
                                        <p className="upload-types">{t("register.upload_types")}</p>
                                        <p className="upload-limit">{t("register.upload_limit")}</p>
                                        <input 
                                            id="file-upload" 
                                            type="file" 
                                            multiple 
                                            accept="image/jpeg,image/png,image/jpg,image/webp" 
                                            style={{ display: 'none' }} 
                                            onChange={handleFileUpload}
                                            aria-label={t("register.upload_files")}
                                        />
                                    </div>
                                    {formData.images.length > 0 && (
                                        <div className="preview-grid">
                                            {formData.images.map((file, index) => (
                                                <div key={index} className="file-preview-card">
                                                    <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="image-preview" />
                                                    <button type="button" className="remove-file-btn" onClick={() => {
                                                        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
                                                    }}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button type="button" className="btn-next" onClick={nextStep}>
                                    {t("register.next")} {i18n.language === 'ar' ? <FiArrowLeft /> : <FiArrowRight />}
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="s2" custom={direction} variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="step-container">
                                <div className="glass-section">
                                    <div className="section-title"><FiMapPin /> {t("register.location_details")}</div>
                                    <div className="input-wrapper select-wrapper">
                                        <FiMapPin className={`input-icon ${touched.region && errors.region ? 'error' : ''}`} />
                                        <select 
                                            name="region" 
                                            value={formData.region} 
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`select-input ${touched.region && errors.region ? 'error' : ''}`}
                                            aria-label={t("register.service_area")}
                                            aria-required="true"
                                            aria-invalid={touched.region && !!errors.region}
                                        >
                                            <option value="">{t("register.service_area")}</option>
                                            <option value="city">{t("register.homs_city")}</option>
                                            <option value="rastan">{t("register.rastan")}</option>
                                            <option value="talkalakh">{t("register.talkalakh")}</option>
                                            <option value="qusayr">{t("register.qusayr")}</option>
                                        </select>
                                        <FiChevronDown className="select-chevron" />
                                        {touched.region && errors.region && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="error-message"
                                            >
                                                <FiAlertCircle /> {errors.region}
                                            </motion.div>
                                        )}
                                    </div>
                                    <div 
                                        className="location-map-button" 
                                        onClick={() => {/* Handle map location */}}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={t("register.set_location_map")}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                // Handle map location
                                            }
                                        }}
                                    >
                                        <FiMapPin />
                                        <span>{t("register.set_location_map")}</span>
                                    </div>
                                    <EnhancedInput
                                        icon={FiMapPin}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder={t("register.detailed_address")}
                                        error={errors.address}
                                        touched={touched.address}
                                        required
                                    />
                                    <EnhancedInput
                                        icon={FaWhatsapp}
                                        name="whatsappNumber"
                                        type="tel"
                                        value={formData.whatsappNumber}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder="9XXXXXXXX"
                                        error={errors.whatsappNumber}
                                        touched={touched.whatsappNumber}
                                    />
                                    <div className="input-label">
                                        <FaWhatsapp className="label-icon" />
                                        <span>{t("register.whatsapp_number")}</span>
                                    </div>
                                    <div className="dual-grid">
                                        <EnhancedInput
                                            icon={FaFacebook}
                                            name="facebookPage"
                                            value={formData.facebookPage}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder={t("register.facebook_page")}
                                            error={errors.facebookPage}
                                            touched={touched.facebookPage}
                                        />
                                        <EnhancedInput
                                            icon={FaInstagram}
                                            name="instagramLink"
                                            value={formData.instagramLink}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder={t("register.instagram_link")}
                                            error={errors.instagramLink}
                                            touched={touched.instagramLink}
                                        />
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <button type="button" className="btn-back" onClick={prevStep}>{t("register.previous")}</button>
                                    <button type="button" className="btn-next" style={{ flex: 2 }} onClick={nextStep}>
                                        {t("register.next")} {i18n.language === 'ar' ? <FiArrowLeft /> : <FiArrowRight />}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="s3" custom={direction} variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="step-container">
                                <div className="glass-section">
                                    <div className="section-title"><FiSettings /> {t("register.services_title")}</div>

                                    <div 
                                        className={`emergency-toggle-container ${formData.emergency ? 'active' : ''}`}
                                        onClick={() => setFormData(p => ({...p, emergency: !p.emergency}))}
                                    >
                                        <div className="toggle-label">{t("register.emergency_active")}</div>
                                        <div className={`custom-switch ${formData.emergency ? 'on' : ''}`}>
                                            <div className="switch-handle"></div>
                                        </div>
                                    </div>

                                    <div className="selection-grid">
                                        {[
                                            { id: 'fuel', label: t("register.fuel"), icon: FiDroplet },
                                            { id: 'tow', label: t("register.towing"), icon: FiTruck },
                                            { id: 'elec', label: t("register.electrical"), icon: FiZap },
                                            { id: 'mech', label: t("register.mechanics"), icon: FiTool },
                                            { id: 'tire', label: t("register.tire"), icon: FiSettings },
                                            { id: 'paint', label: t("register.painting"), icon: FiLayout }
                                        ].map(service => (
                                            <SelectionTile 
                                                key={service.id}
                                                icon={service.icon} 
                                                label={service.label} 
                                                selected={formData.services.some(s => s.id === service.id)} 
                                                onClick={() => toggleService(service.id)} 
                                                hasPrice 
                                                t={t} 
                                                priceValue={formData.services.find(s => s.id === service.id)?.price || ""} 
                                                onPriceChange={(v) => updateServicePrice(service.id, v)} 
                                            />
                                        ))}
                                    </div>
                                    {touched.services && errors.services && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="error-message"
                                            style={{ marginTop: '15px' }}
                                        >
                                            <FiAlertCircle /> {errors.services}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Facilities Section */}
                                <div className="glass-section" style={{ marginTop: '30px' }}>
                                    <div className="section-title"><FiCoffee /> {t("register.amenities_title")}</div>
                                    <div className="facilities-grid">
                                        {[
                                            { id: 'wifi', label: t("register.facility_wifi"), icon: FiWifi },
                                            { id: 'waiting', label: t("register.facility_waiting"), icon: FiCoffee },
                                            { id: 'parts', label: t("register.facility_parts"), icon: FiPackage }
                                        ].map(facility => {
                                            const FacilityIcon = facility.icon;
                                            return (
                                                <div 
                                                    key={facility.id}
                                                    className={`facility-card ${formData.amenities.includes(facility.id) ? 'selected' : ''}`}
                                                    onClick={() => toggleAmenity(facility.id)}
                                                >
                                                    <div className="card-icon"><FacilityIcon /></div>
                                                    <div className="card-label">{facility.label}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="premium-stats-grid">
                                    <div className="stat-card">
                                        <div className="stat-icon"><FiAward /></div>
                                        <div className="stat-content">
                                            <label>{t("register.experience")} <FiInfo className="help-tooltip" /></label>
                                            <div className="premium-stepper">
                                                <button type="button" onClick={() => handleStepChange('experience', 'down')}>-</button>
                                                <input type="number" readOnly value={formData.experience} />
                                                <button type="button" onClick={() => handleStepChange('experience', 'up')}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon"><FiUsers /></div>
                                        <div className="stat-content">
                                            <label>{t("register.staff_title")} <FiInfo className="help-tooltip" /></label>
                                            <div className="premium-stepper">
                                                <button type="button" onClick={() => handleStepChange('staffCount', 'down')}>-</button>
                                                <input type="number" readOnly value={formData.staffCount} />
                                                <button type="button" onClick={() => handleStepChange('staffCount', 'up')}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-wrapper" style={{ marginTop: '20px' }}>
                                    <textarea name="about" placeholder={t("register.about")} value={formData.about} onChange={handleInputChange} rows="3" />
                                </div>

                                <div className="step-actions">
                                    <button type="button" className="btn-back" onClick={prevStep}>{t("register.previous")}</button>
                                    <button type="button" className="btn-next" style={{ flex: 2 }} onClick={nextStep}>
                                        {t("register.next")} {i18n.language === 'ar' ? <FiArrowLeft /> : <FiArrowRight />}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="s4" custom={direction} variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="step-container">
                                <div className="glass-section">
                                    <div className="section-title"><FiClock /> {t("register.schedule_title")}</div>
                                    <div className="schedule-list">
                                        {['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'].map(day => (
                                            <DaySchedule key={day} day={day} data={formData.schedule[day]} onToggle={toggleDay} onTimeChange={updateTime} t={t} />
                                        ))}
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <button type="button" className="btn-back" onClick={prevStep}>{t("register.previous")}</button>
                                    <button 
                                        type="button" 
                                        className={`btn-submit ${isLoading ? 'loading' : ''}`} 
                                        style={{ flex: 2 }} 
                                        onClick={async () => {
                                            if (validateStep(4)) {
                                                setIsLoading(true);
                                                // Simulate API call
                                                await new Promise(resolve => setTimeout(resolve, 2000));
                                                setIsSubmitted(true);
                                                setIsLoading(false);
                                                localStorage.removeItem('registerFormData');
                                                setToast({ type: 'success', message: t('register.success') });
                                            } else {
                                                setToast({ type: 'error', message: t('register.validation.please_fix_errors') });
                                                setTimeout(() => setToast(null), 3000);
                                            }
                                        }}
                                        disabled={isLoading}
                                    >
                                        {!isLoading && <FiCheckCircle />} {t("register.submit_request")}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>

                <div style={{ marginTop: '25px', textAlign: 'center' }}>
                    <Link to="/" style={{ color: 'var(--primary)', fontWeight: 700 }}>← {t("register.back")}</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
