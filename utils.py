"""Helper functions.
"""

import logging
import optparse 
import database
from sqlalchemy import pool

# Some basic configuration
LOGGING_FORMAT  = '%(levelname)s: %(asctime)-15s: %(message)s'

# Uniform interface for parsing options, with some common built-in options.

conn_options = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'password': 'mainatati',
    'database': 'insights'
}

# Wraps SQLAlchemy's DB Pool into our own connection pool.
db_pool = pool.manage(database)
def get_db_conn(host=None, port=None, user=None, password=None, database=None):
    """Returns a database connection from the connection pool."""
    global db_pool
    global conn_options
    assert conn_options

    if host is None:
        host = conn_options['host']
    if port is None:
        port = conn_options['port']
    if user is None:
        user = conn_options['user']
    if password is None:
        password = conn_options['password']
    if database is None:
        database = conn_options['database']

    return db_pool.connect(
            host='%s:%d' % (host, port), 
            user=user, password=password, database=database)

# Sets up the global logger.
logger = logging.basicConfig(level=logging.ERROR, format=LOGGING_FORMAT)
logger = logging

# Formats ajax response
def format_response(running, error=None, **kwargs):
    ret = {'running' : running}
    if error:
        assert isinstance(error, ServerException)
        ret['error'] = error.to_dict()
        
    ret.update(kwargs)
    return json.dumps(ret)
