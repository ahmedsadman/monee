from contextvars import ContextVar
from httpx import AsyncClient

async_client_var: ContextVar[AsyncClient] = ContextVar("async_client")
async_client = async_client_var.get
