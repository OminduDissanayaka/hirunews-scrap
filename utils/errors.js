/**
 * Author: Omindu Dissanayaka
 * Software Engineering Undergraduate
 * Website: https://www.omindu.dev
 * Email: hellow@omindu.dev
 *
 *  _     _                                                                                   
 * | |__ (_)_ __ _   _ _ __  _   _  _____      _____       ___  ___ _ __ __ _ _ __   ___ _ __ 
 * | '_ \| | '__| | | | '_ \| | | |/ _ \ \ /\ / / __|_____/ __|/ __| '__/ _` | '_ \ / _ \ '__|
 * | | | | | |  | |_| | | | | |_| |  __/\ V  V /\__ \_____\__ \ (__| | | (_| | |_) |  __/ |   
 * |_| |_|_|_|   \__,_|_| |_|\__,_|\___| \_/\_/ |___/     |___/\___|_|  \__,_| .__/ \___|_|   
 *                                                                           |_|              
 */

/**
 * Centralized error classes and helpers for the project.
 *
 * Provides structured errors (with `code` and `meta`) and a small
 * logger helper so all modules can report errors consistently.
 */

class AppError extends Error {
  /**
   * @param {string} message
   * @param {string} code
   * @param {Object} [meta]
   */
  constructor(message, code = 'ERR_APP', meta = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.meta = meta || {};
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      meta: this.meta
    };
  }
}

class ValidationError extends AppError {
  constructor(message, meta) {
    super(message, 'ERR_VALIDATION', meta);
  }
}

class FetchError extends AppError {
  constructor(message, meta) {
    super(message, 'ERR_FETCH_FAILED', meta);
  }
}

class ExportError extends AppError {
  constructor(message, meta) {
    super(message, 'ERR_EXPORT_FAILED', meta);
  }
}

/**
 * Return true if the error is one of the AppError subclasses.
 * @param {any} err
 * @returns {boolean}
 */
function isAppError(err) {
  return err instanceof AppError;
}

/**
 * Log an error in a consistent, developer-friendly format.
 * @param {Error|any} err
 * @param {string} [context] - optional short tag identifying the module/function
 */
function logError(err, context = '') {
  const ctx = context ? `[${context}]` : '[error]';
  if (err && err.code) {
    console.error(`${ctx} ${err.code}: ${err.message}`);
    if (err.meta && Object.keys(err.meta).length) console.error(`${ctx} meta:`, err.meta);
    if (err.stack) console.error(err.stack);
    return;
  }


  try {
    const message = err && err.message ? err.message : String(err);
    console.error(`${ctx} ${message}`);
    if (err && err.stack) console.error(err.stack);
  } catch (e) {
    console.error(`${ctx} (unable to stringify error)`);
  }
}

module.exports = {
  AppError,
  ValidationError,
  FetchError,
  ExportError,
  isAppError,
  logError
};